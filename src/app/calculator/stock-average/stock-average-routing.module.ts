import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockAveragePage } from './stock-average.page';

const routes: Routes = [
  {
    path: '',
    component: StockAveragePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockAveragePageRoutingModule {}
