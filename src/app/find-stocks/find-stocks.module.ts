import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindStocksPageRoutingModule } from './find-stocks-routing.module';

import { FindStocksPage } from './find-stocks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindStocksPageRoutingModule
  ],
  declarations: [FindStocksPage]
})
export class FindStocksPageModule {}
