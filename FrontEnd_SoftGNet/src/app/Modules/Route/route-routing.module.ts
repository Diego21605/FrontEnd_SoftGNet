import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageRoutesComponent } from '../../Views/ManageRoutes/ManageRoutes.component';

const routes: Routes = [
  {
    path: '',
    component: ManageRoutesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteRoutingModule { }