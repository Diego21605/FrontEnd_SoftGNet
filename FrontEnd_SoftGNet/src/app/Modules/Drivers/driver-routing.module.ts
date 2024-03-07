import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDriversComponent } from '../../Views/ManageDrivers/ManageDrivers.component';
import { ValidateRoutesGuard } from '../../Guards/validate-routes.guard';

const routes: Routes = [
  {
    path: '',
    component: ManageDriversComponent,
    canActivate: [ValidateRoutesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }