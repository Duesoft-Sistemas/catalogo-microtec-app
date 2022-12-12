import { NgModule } from '@angular/core';
import { PromocoesComponent } from './promocoes.component';
import { PromocoesRoutes } from './promocoes.routing';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [SharedModule, PromocoesRoutes],
  declarations: [PromocoesComponent],
})
export class PromocoesModule {}
