import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockFiboAveragePage } from './stock-fibo-average.page';

const routes: Routes = [
  {
    path: '',
    component: StockFiboAveragePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockFiboAveragePageRoutingModule {}
