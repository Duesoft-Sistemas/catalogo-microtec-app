import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { take } from 'rxjs';
import { FiltroPesquisarProdutos } from 'src/app/shared/classes/filtro-pesquisar-produtos';
import { FiltroProdutosComponent } from 'src/app/shared/components/filtro-produtos/filtro-produtos.component';
import { Toaster } from 'src/app/shared/functions/toaster';
import { AuthStorageService } from 'src/app/shared/guards/auth-storage.service';
import { IProdutos } from 'src/app/shared/interface/IProdutos';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-pesquisar-produtos',
  templateUrl: './pesquisar-produtos.component.html',
  styleUrls: ['./pesquisar-produtos.component.css']
})
export class PesquisarProdutosComponent implements OnInit {
  spinner = false;
  totalPaginas: number;
  listProdutos: IProdutos[] = [];
  modelo = new FiltroPesquisarProdutos();

  constructor(
    private service: GlobalService,
    public dialog: MatDialog,
    private storage: AuthStorageService
  ) {
    this.totalPaginas = 0;
    this.modelo.page = 1;
  }

  ngOnInit() {
    this.storage.setTitlePage('Produtos');
    this.buscarProdutosFiltro().then(x => this.openModalFiltro());
  }

  goTo(event: PageChangedEvent): void {
    this.modelo.page = event.page;
    this.buscarProdutosFiltro();
  }

  openModalFiltro(): void {
    const dialogRef = this.dialog.open(FiltroProdutosComponent, {
      data: {
        width: '200px',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.modelo = new FiltroPesquisarProdutos(result);
        this.buscarProdutosFiltro();
      }
    });
  }

  private buscarProdutosFiltro(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.spinner = true;
      this.service
        .getProdutosPesquisa(this.modelo)
        .pipe(take(1))
        .subscribe({
          next: (data: any) => {
            if (data) {
              resolve(data);
              this.listProdutos = data.produtos;
              this.totalPaginas = data.totalPaginas;
              if (data.produtos.lengh <= 0) {
                Toaster.Warning('Nenhum produto encontrado.');
              }
            } else {
              Toaster.Warning('Nenhum produto encontrado.');
              resolve(null);
            }
          },
          error: (error: any) => {
            reject(error);
            Toaster.Error(error);
            this.spinner = false;
          },
          complete: () => {
            this.spinner = false;
          },
        });
    });
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
