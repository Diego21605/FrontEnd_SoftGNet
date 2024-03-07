import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageSchedulerComponent } from '../../Views/ManageScheduler/ManageScheduler.component';
import { ValidateRoutesGuard } from '../../Guards/validate-routes.guard';

const routes: Routes = [
  {
    path: '',
    component: ManageSchedulerComponent,
    canActivate: [ValidateRoutesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulerRoutingModule { }