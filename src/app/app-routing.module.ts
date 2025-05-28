import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { GuestGuard } from './guest.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'find-stocks',
    pathMatch: 'full'
  },
  {
    path: 'personal-trading',
    loadChildren: () => import('./personal-trading/personal-trading.module').then(m => m.PersonalTradingPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    // canActivate: [GuestGuard]
  },
  {
    path: 'stock-fibo-average',
    loadChildren: () => import('./calculator/stock-fibo-average/stock-fibo-average.module').then(m => m.StockFiboAveragePageModule)
  },
  {
    path: 'find-stocks',
    loadChildren: () => import('./find-stocks/find-stocks.module').then(m => m.FindStocksPageModule)
  },
  {
    path: 'stock-average',
    loadChildren: () => import('./calculator/stock-average/stock-average.module').then(m => m.StockAveragePageModule)
  },
  {
    path: 'dividend',
    loadChildren: () => import('./dividend/dividend.module').then(m => m.DividendPageModule)
  },
  {
    path: 'portfolio',
    loadChildren: () => import('./calculator/portfolio/portfolio.module').then(m => m.PortfolioPageModule)
  },
  {
    path: 'drawdown',
    loadChildren: () => import('./calculator/drawdown/drawdown.module').then(m => m.DrawdownPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
