import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

import { ArticlesGuard, CodeGuard, TalksGuard } from './core/guards';

const routes: Routes = [
  { path: 'home', pathMatch: 'full', loadChildren: 'app/home/home.module#HomeModule' },
  { path: 'articles', pathMatch: 'full', loadChildren: 'app/articles/articles.module#ArticlesModule', canActivateChild: [ArticlesGuard] },
  { path: 'code', pathMatch: 'full', loadChildren: 'app/code/code.module#CodeModule', canActivateChild: [CodeGuard] },
  { path: 'talks', pathMatch: 'full', loadChildren: 'app/talks/talks.module#TalksModule', canActivateChild: [TalksGuard] },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled', preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
