import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { GuestGuard } from './guest.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./personal-trading/personal-trading.module').then(m => m.PersonalTradingPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [GuestGuard]
  },  {
    path: 'stock-fibo-average',
    loadChildren: () => import('./calculator/stock-fibo-average/stock-fibo-average.module').then( m => m.StockFiboAveragePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
