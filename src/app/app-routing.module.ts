import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { CatQuotesViewComponent } from './components/cat-quotes-view/cat-quotes-view.component';

const routes: Routes = [
  { path: 'login', component: LoginViewComponent },
  { path: 'quotes', component: CatQuotesViewComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
