import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockAveragePageRoutingModule } from './stock-average-routing.module';

import { StockAveragePage } from './stock-average.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockAveragePageRoutingModule
  ],
  declarations: [StockAveragePage]
})
export class StockAveragePageModule {}
