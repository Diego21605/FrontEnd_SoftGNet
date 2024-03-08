import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./Modules/Login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./Modules/Home/home.module').then(m => m.HomeModule) },
  { path: 'drivers', loadChildren: () => import('./Modules/Drivers/driver.module').then(m => m.DriverModule) },
  { path: 'rts-vehicles', loadChildren: () => import('./Modules/rts/rts.module').then(m => m.RtsModule) },
  { path: 'scheduler', loadChildren: () => import('./Modules/Scheduler/scheduler.module').then(m => m.SchedulerModule) },
  { path: 'vehicules', loadChildren: () => import('./Modules/Vehicles/vehicle.module').then(m => m.VehicleModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
