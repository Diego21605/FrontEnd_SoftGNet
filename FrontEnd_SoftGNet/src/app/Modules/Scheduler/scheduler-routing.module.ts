import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageSchedulerComponent } from '../../Views/ManageScheduler/ManageScheduler.component';

const routes: Routes = [
  {
    path: '',
    component: ManageSchedulerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulerRoutingModule { }