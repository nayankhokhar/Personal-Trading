import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockFiboAveragePageRoutingModule } from './stock-fibo-average-routing.module';

import { StockFiboAveragePage } from './stock-fibo-average.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockFiboAveragePageRoutingModule
  ],
  declarations: [StockFiboAveragePage]
})
export class StockFiboAveragePageModule {}
