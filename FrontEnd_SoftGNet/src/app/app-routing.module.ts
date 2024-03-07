import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Views/Login/Login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', loadChildren: () => import('./Modules/Login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./Modules/Home/home.module').then(m => m.HomeModule) },
  { path: 'drivers', loadChildren: () => import('./Modules/Drivers/driver.module').then(m => m.DriverModule) },
  { path: 'routes', loadChildren: () => import('./Modules/Route/route.module').then(m => m.RouteModule) },
  { path: 'scheduler', loadChildren: () => import('./Modules/Scheduler/scheduler.module').then(m => m.SchedulerModule) },
  { path: 'vehicules', loadChildren: () => import('./Modules/Vehicules/vehicule.module').then(m => m.VehiculeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
