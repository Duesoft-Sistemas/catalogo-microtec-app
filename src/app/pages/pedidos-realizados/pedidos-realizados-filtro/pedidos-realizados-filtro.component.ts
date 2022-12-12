import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { take } from 'rxjs';
import { FiltroPedidosRealizados } from 'src/app/shared/classes/filtro-pedidos-realizados';
import { Formularios } from 'src/app/shared/functions/formularios';
import { Toaster } from 'src/app/shared/functions/toaster';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-pedidos-realizados-filtro',
  templateUrl: './pedidos-realizados-filtro.component.html',
  styleUrls: ['./pedidos-realizados-filtro.component.css']
})
export class PedidosRealizadosFiltroComponent implements OnInit {
  formulario: FormGroup;
  listStatus: any[] = [];
  loadListStatus = true;

  constructor(
    public dialogRef: MatDialogRef<FiltroPedidosRealizados>,
    @Inject(MAT_DIALOG_DATA) public filtro: any,
    private localeService: BsLocaleService,
    public dialog: MatDialog,
    private service: GlobalService
  ) {
    ptBrLocale.invalidDate = 'Insira uma data válida';
    defineLocale('pt-br', ptBrLocale);
    this.localeService.use('pt-br');
    this.getListaStatus();
    this.formulario = Formularios.geraFormulario(
      new FiltroPedidosRealizados(filtro)
    );
  }

  buscar(): void {
    this.dialogRef.close(new FiltroPedidosRealizados(this.formulario.value));
  }

  limpar(): void {
    this.formulario = Formularios.geraFormulario(new FiltroPedidosRealizados());
  }

  private getListaStatus(): void {
    this.service
      .getStatusPedidos()
      .pipe(take(1))
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.listStatus = data;
            this.loadListStatus = false;
          } else {
            Toaster.Error(
              'Não foi possivel carregar lista de status de pedidos.'
            );
          }
        },
        error: (error) => Toaster.Error(Toaster.msg.ErroCarregarDados),
      });
  }

  ngOnInit() {}
}
