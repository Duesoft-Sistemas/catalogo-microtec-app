import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FornecedoresComponent } from './fornecedores.component';
import { FornecedoresRoutes } from './fornecedores.routing';

@NgModule({
  imports: [
    SharedModule,
    FornecedoresRoutes
  ],
  declarations: [FornecedoresComponent]
})
export class FornecedoresModule { }
