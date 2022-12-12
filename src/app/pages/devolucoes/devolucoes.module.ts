import { NgModule } from '@angular/core';
import { DevolucoesComponent } from './devolucoes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DevolucoesRoutes } from './devolucoes.routing';

@NgModule({
  imports: [
    SharedModule,
    DevolucoesRoutes,
  ],
  declarations: [DevolucoesComponent]
})
export class DevolucoesModule { }
