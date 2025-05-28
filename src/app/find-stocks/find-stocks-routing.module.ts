import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindStocksPage } from './find-stocks.page';

const routes: Routes = [
  {
    path: '',
    component: FindStocksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindStocksPageRoutingModule {}
