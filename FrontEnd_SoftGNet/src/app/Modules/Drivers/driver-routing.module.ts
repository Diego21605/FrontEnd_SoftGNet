import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDriversComponent } from '../../Views/ManageDrivers/ManageDrivers.component';

const routes: Routes = [
  {
    path: '',
    component: ManageDriversComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }