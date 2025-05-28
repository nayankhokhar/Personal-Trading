import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DividendPageRoutingModule } from './dividend-routing.module';

import { DividendPage } from './dividend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DividendPageRoutingModule
  ],
  declarations: [DividendPage]
})
export class DividendPageModule {}
