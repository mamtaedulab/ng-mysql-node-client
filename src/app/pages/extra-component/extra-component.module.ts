import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbThemeModule } from '@nebular/theme';
import { ExtraComponentRoutingModule } from './extra-component-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ExtraComponentRoutingModule,
    NbThemeModule
  ]
})
export class ExtraComponentModule { }
