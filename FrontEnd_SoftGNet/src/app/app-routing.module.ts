import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Views/Login/Login.component';

const routes: Routes = [
  { path: '**', redirectTo: 'login' },
  { path: '', component: LoginComponent },
  { path: 'login', loadChildren: () => import('./Modules/Login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./Modules/Home/home.module').then(m => m.HomeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
