import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrawdownPageRoutingModule } from './drawdown-routing.module';

import { DrawdownPage } from './drawdown.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrawdownPageRoutingModule
  ],
  declarations: [DrawdownPage]
})
export class DrawdownPageModule {}
