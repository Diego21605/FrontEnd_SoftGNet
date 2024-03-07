import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageVehiculesComponent } from '../../Views/ManageVehicules/ManageVehicules.component';

const routes: Routes = [
  {
    path: '',
    component: ManageVehiculesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculeRoutingModule { }