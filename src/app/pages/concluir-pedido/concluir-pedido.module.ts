import { NgModule } from '@angular/core';
import { ConcluirPedidoComponent } from './concluir-pedido.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConcluirPedidoRoutes } from './concluir-pedido.routing';

@NgModule({
  imports: [
    SharedModule,
    ConcluirPedidoRoutes
  ],
  declarations: [ConcluirPedidoComponent]
})
export class ConcluirPedidoModule { }
