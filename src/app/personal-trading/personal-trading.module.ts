import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalTradingPageRoutingModule } from './personal-trading-routing.module';

import { PersonalTradingPage } from './personal-trading.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalTradingPageRoutingModule
  ],
  declarations: [PersonalTradingPage]
})
export class PersonalTradingPageModule {}
