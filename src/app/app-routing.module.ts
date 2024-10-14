import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'personal-trading',
    pathMatch: 'full'
  },
  {
    path: 'personal-trading',
    loadChildren: () => import('./personal-trading/personal-trading.module').then( m => m.PersonalTradingPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
