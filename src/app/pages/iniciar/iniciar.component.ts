import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { take } from 'rxjs';
import { PesquisaEsteiraClass } from 'src/app/shared/classes/pesquisa-esteira-class';
import { FiltroProdutosComponent } from 'src/app/shared/components/filtro-produtos/filtro-produtos.component';
import { KeyboardKey } from 'src/app/shared/enums/keyboard-key.enum';
import { Formularios } from 'src/app/shared/functions/formularios';
import { Toaster } from 'src/app/shared/functions/toaster';
import { AuthStorageService } from 'src/app/shared/guards/auth-storage.service';
import { IProdutos } from 'src/app/shared/interface/IProdutos';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.component.html',
  styleUrls: ['./iniciar.component.css']
})
export class IniciarComponent implements OnInit {
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: any) {
    if (this.listProdutos.length <= 0) {
      if (
        event.code === KeyboardKey.Enter ||
        event.code === KeyboardKey.EnterNumpad
      ) {
        if (event.target.id === 'inputSearchDescricao')
          this.buscaProdutosPorDescricao();
        // else this.pesquisarProdutos();
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  innerWidth: any;
  spinner = false;

  formEsteira: FormGroup;
  descricao: string;

  listProdutos: IProdutos[] = [];

  constructor(
    private service: GlobalService,
    private storage: AuthStorageService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.limpar();
      }
    });
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.storage.setTitlePage('Início');

    this.formEsteira = Formularios.geraFormulario(new PesquisaEsteiraClass());
  }

  limpar(): void {
    this.listProdutos = [];
    this.formEsteira = Formularios.geraFormulario(new PesquisaEsteiraClass());
  }

  private getDataBusca(): any {
    this.descricao = this.descricao?.trim() ?? '';
    this.descricao = this.descricao.toUpperCase();

    return { Code: this.descricao, Page: +this.formEsteira.get('page').value };
  }

  buscaProdutosPorDescricao(): void {
    this.spinner = true;
    this.service
      .getProdutosPesquisa(this.getDataBusca())
      .pipe(take(1))
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.listProdutos = data.produtos;
            this.formEsteira.get('totalPages').setValue(data.totalPaginas);
            if (data.produtos.lenght <= 0)
              Toaster.Warning('Nenhum produto encontrado.');
          } else Toaster.Warning('Nenhum produto encontrado.');
        },
        error: (error) => {
          Toaster.Error('Nenhum produto encontrado.');
          this.spinner = false;
        },
        complete: () => {
          this.spinner = false;
        },
      });
  }

  openModalFiltro(): void {
    const dialogRef = this.dialog.open(FiltroProdutosComponent, {
      data: {
        width: '200px',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.descricao = result.code;
        // this.modelo = new FiltroPesquisarProdutos(result);
        this.buscaProdutosPorDescricao();
      }
    });
  }

  goTo(event: PageChangedEvent): void {
    this.formEsteira.get('page').setValue(event.page);
    // if (this.tipoPesquisa === TipoPesquisa.Esteira) this.pesquisarProdutos();
    // else
    this.buscaProdutosPorDescricao();
  }
}
