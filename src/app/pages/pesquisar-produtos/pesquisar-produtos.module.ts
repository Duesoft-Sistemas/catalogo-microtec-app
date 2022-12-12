import { NgModule } from '@angular/core';
import { PesquisarProdutosComponent } from './pesquisar-produtos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PesquisarProdutosRoutes } from './pesquisar-produtos.routing';

@NgModule({
  imports: [
    SharedModule,
    PesquisarProdutosRoutes,
  ],
  declarations: [PesquisarProdutosComponent]
})
export class PesquisarProdutosModule { }
