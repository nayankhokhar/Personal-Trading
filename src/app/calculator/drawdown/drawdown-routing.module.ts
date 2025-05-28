import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrawdownPage } from './drawdown.page';

const routes: Routes = [
  {
    path: '',
    component: DrawdownPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrawdownPageRoutingModule {}
