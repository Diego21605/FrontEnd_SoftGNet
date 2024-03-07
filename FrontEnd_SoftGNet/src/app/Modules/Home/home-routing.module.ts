import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../Views/home/home.component';
import { ValidateRoutesGuard } from '../../Guards/validate-routes.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ValidateRoutesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }