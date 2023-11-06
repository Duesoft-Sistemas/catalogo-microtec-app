import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { take } from 'rxjs';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';
import { Toaster } from 'src/app/shared/functions/toaster';
import { IItensPedidosRealizadosDetalhes, IPedidosRealizadosDetalhes } from 'src/app/shared/interface/IPedidosRealizadosDetalhes';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-pedidos-realizados-detalhes',
  templateUrl: './pedidos-realizados-detalhes.component.html',
  styleUrls: ['./pedidos-realizados-detalhes.component.css']
})
export class PedidosRealizadosDetalhesComponent implements OnInit {
  spinner = true;
  dados: IPedidosRealizadosDetalhes;

  columns = [
    {
      columnDef: 'produto',
      header: 'Produto',
      cell: (element: IItensPedidosRealizadosDetalhes) =>
        `${element.code}-${element.description}`,
    },
    {
      columnDef: 'quantidade',
      header: 'Qtde',
      cell: (element: IItensPedidosRealizadosDetalhes) =>
        `${element.appQtd}/${element.unity}`,
    },
    {
      columnDef: 'valor',
      header: 'Valor',
      cell: (element: IItensPedidosRealizadosDetalhes) =>
        `${this.getPrice(element.appTotalPrice)}`,
      currency: true,
    },
    {
      columnDef: 'total',
      header: 'Total',
      cell: (element: IItensPedidosRealizadosDetalhes) =>
        `${this.getPrice(element.appTotalPrice)}`,
      currency: true,
    },
  ];
  dataSource: MatTableDataSource<IItensPedidosRealizadosDetalhes> =
    new MatTableDataSource<IItensPedidosRealizadosDetalhes>();

  constructor(
    public dialogRef: MatDialogRef<PedidosRealizadosDetalhesComponent>,
    @Inject(MAT_DIALOG_DATA) public solicitationNumber: number,
    private service: GlobalService,
    private dialog: MatDialog,
    private localeService: BsLocaleService
  ) {
    ptBrLocale.invalidDate = 'Insira uma data válida';
    defineLocale('pt-br', ptBrLocale);
    this.localeService.use('pt-br');
    this.getDados();
  }

  ngOnInit() {}

  getDados(): void {
    this.service
      .detalhesPedidosRealizados(this.solicitationNumber)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.dados = data;
          this.dataSource =
            new MatTableDataSource<IItensPedidosRealizadosDetalhes>(data.itens);
          if (data) {
            if (data.lengh <= 0) {
              Toaster.Warning('Nenhum dado encontrado.');
            }
          } else {
            Toaster.Warning('Nenhum dado encontrado.');
          }
        },
        error: (error) => {
          Toaster.Error(error);
          this.spinner = false;
        },
        complete: () => {
          this.spinner = false;
        },
      });
  }

  openModalConfirmarCancelarpedido(): void {
    let dialog = this.dialog.open(ModalConfirmComponent, {
      width: '350px',
      data: {
        title: 'Cancelar Pedido ?',
      },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) this.cancelarPedido().then((x) => this.dialogRef.close(true));
    });
  }

  cancelarPedido(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.spinner = true;
      this.service
        .cancelarPedido(this.dados.solicitationNumber)
        .pipe(take(1))
        .subscribe({
          next: (data: any) => {
            this.spinner = false;
            if (data) {
              Toaster.Info(data);
              resolve(true);
            } else {
              Toaster.Warning(
                'Não foi possível cancelar o pedido. Entre em contato com seu fornecedor.'
              );
              resolve(false);
            }
          },
          error: (error) => {
            this.spinner = false;
            Toaster.Error(
              error.text ??
                'Ocorreu um erro ao efetuar uma requisição de dados. Entre em contato com seu fornecedor.'
            );
            reject(false);
          },
        });
    });
  }

  getPrice(price: any): number {
    return price?.replace(',', '.') as number;
  }

  getDate(date: any): Date {
    var parts = date.split('/');
    let data = new Date(parts[2], parts[1] - 1, parts[0]);
    return data;
  }
}
