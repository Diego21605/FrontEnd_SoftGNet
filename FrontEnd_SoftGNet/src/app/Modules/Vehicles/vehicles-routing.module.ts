import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageVehiclesComponent } from '../../Views/ManageVehicles/ManageVehicles.component';

const routes: Routes = [
  {
    path: '',
    component: ManageVehiclesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }