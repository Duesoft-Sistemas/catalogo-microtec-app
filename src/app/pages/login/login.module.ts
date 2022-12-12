import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutes } from './login.routing';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    LoginRoutes,
    SharedModule,
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
