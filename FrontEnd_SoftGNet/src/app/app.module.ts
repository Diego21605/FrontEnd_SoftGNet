import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorInterceptor } from './Helpers/Error.interceptor';
import { JwtInterceptor } from './Helpers/JwtInterceptor.interceptor';
import { LoginComponent } from './Views/Login/Login.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { HomeComponent } from './Views/home/home.component';
import { SideBarComponent } from './Views/sideBar/sideBar.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { ManageDriversComponent } from './Views/ManageDrivers/ManageDrivers.component';
import { ManageRoutesComponent } from './Views/ManageRoutes/ManageRoutes.component';
import { ManageSchedulerComponent } from './Views/ManageScheduler/ManageScheduler.component';
import { ManageVehiclesComponent } from './Views/ManageVehicles/ManageVehicles.component';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideBarComponent,
    HomeComponent,
    ManageDriversComponent,
    ManageRoutesComponent,
    ManageSchedulerComponent,
    ManageVehiclesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StorageServiceModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CalendarModule,
    DropdownModule,
    FloatLabelModule,
    InputTextModule,
    InputNumberModule,
    PasswordModule,
    ToastModule,
    ProgressSpinnerModule,
    MegaMenuModule,
    CardModule,
    ToolbarModule,
    TableModule,
    DialogModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
