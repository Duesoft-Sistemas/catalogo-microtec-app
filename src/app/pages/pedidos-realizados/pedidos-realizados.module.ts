import { NgModule } from '@angular/core';
import { PedidosRealizadosComponent } from './pedidos-realizados.component';
import { PedidosRealizadosDetalhesComponent } from './pedidos-realizados-detalhes/pedidos-realizados-detalhes.component';
import { PedidosRealizadosFiltroComponent } from './pedidos-realizados-filtro/pedidos-realizados-filtro.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PedidosRealizadosRoutes } from './pedidos-realizados.routing';

@NgModule({
  imports: [SharedModule, PedidosRealizadosRoutes],
  declarations: [
    PedidosRealizadosComponent,
    PedidosRealizadosDetalhesComponent,
    PedidosRealizadosFiltroComponent,
  ],
})
export class PedidosRealizadosModule {}
