import { NgModule } from '@angular/core';
import { IniciarComponent } from './iniciar.component';
import { IniciarRoutes } from './iniciar.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    IniciarRoutes,
    SharedModule,
    MatIconModule,
  ],
  declarations: [IniciarComponent]
})
export class IniciarModule { }
