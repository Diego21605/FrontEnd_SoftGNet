import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageVehiclesComponent } from '../../Views/ManageVehicles/ManageVehicles.component';
import { ValidateRoutesGuard } from '../../Guards/validate-routes.guard';

const routes: Routes = [
  {
    path: '',
    component: ManageVehiclesComponent,
    canActivate: [ValidateRoutesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }