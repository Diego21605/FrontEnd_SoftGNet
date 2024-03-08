import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Driver, DriversService } from '../../Services/Drivers/Drivers.service';
import { MessagesService } from '../../Services/Messages/Messages.service';
import { Routes, RoutesService } from '../../Services/Route/Routes.service';
import { Vehicles, VehiclesService } from '../../Services/Vehicles/Vehicles.service';
import { States } from '../../Interfaces/States';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ManageRts',
  templateUrl: './ManageRts.component.html',
  styleUrls: ['./ManageRts.component.css']
})
export class ManageRtsComponent implements OnInit {

  load : boolean = false;
  formRoute!: FormGroup;
  routesVehicles: Array<Routes> = [];
  drivers: Array<Driver> = [];
  vehicles: Array<Vehicles> = [];
  @ViewChild('tableRoutes') tableRoutes : Table | undefined;
  modalRoutes: boolean = false;
  states: Array<States> = [{Id: 1, Name: 'Activo'},{Id: 0, Name: 'Inactivo'}];
  
  constructor(private frmBuilder: FormBuilder,
    private msg: MessagesService,
    private routesService: RoutesService,
    private driversService: DriversService,
    private vehiclesService: VehiclesService,
    private messageService: MessageService,) {
      this.initForm();
  }

  ngOnInit() {
    this.getDrivers();
    this.getVehicles();
    this.getRoutesVehicles();
  }

  initForm() {
    this.formRoute = this.frmBuilder.group({
      id: [null],
      description: [null, Validators.required],
      driver_Id: [null, Validators.required],
      vehicle_Id: [null, Validators.required],
      active: [null, Validators.required],
    });
  }

  getRoutesVehicles() {
    this.load = true;
    this.routesService.getRoutes().subscribe(data => this.routesVehicles = data, error => {
      this.msg.errorHttp(`¡No se obtuvo información de las rutas!`, error);
      this.load = false;
    }, () => this.load = false);
  }

  getDrivers() {
    this.load = true;
    this.driversService.getDrivers().subscribe(data => this.drivers = data, error => {
      this.msg.errorHttp(`¡No se obtuvo información de los conductores!`, error);
      this.load = false;
    }, () => this.load = false);
  }

  getVehicles() {
    this.load = true;
    this.vehiclesService.getVehicless().subscribe(data => this.vehicles = data, error => {
      this.load = false;
      this.msg.errorHttp(`¡Ocurrió un problema al consultar la información de los vehiculos!`, error);
    }, () => this.load = false);
  }

  showModalRoutes(data?: Routes) {
    if (data) {
      this.formRoute.patchValue({
        id: data.id,
        description: data.description,
        driver_Id: data.driver_Id,
        vehicle_Id: data.vehicle_Id,
        active: data.active == true ? 1 : 0,
      });
    }
    this.modalRoutes = true;
  }

  validateRoute() {
    if (this.formRoute.value.id) this.editRoute();
    else this.createRoute();
  }

  createRoute() {
    this.load = true;
    let dataRoute: Routes = {
      description: this.formRoute.value.description,
      driver_Id: this.formRoute.value.driver_Id,
      vehicle_Id: this.formRoute.value.vehicle_Id,
      active: this.formRoute.value.active == 1 ? true : false,
    }
    this.routesService.createRoute(dataRoute).subscribe(data => {
      this.modalRoutes = false;
      this.formRoute.reset();
      this.msg.sucess(`¡Se creó una ruta de manera exitosa!`);
      setTimeout(() => this.getRoutesVehicles(), 1000);
    }, error => {
      this.msg.errorHttp(`¡Ocurrió un error al crear la ruta!`, error);
      this.load = false;
    });
  }

  editRoute() {
    this.load = true;
    let dataRoute: Routes = {
      id: this.formRoute.value.id,
      description: this.formRoute.value.description,
      driver_Id: this.formRoute.value.driver_Id,
      vehicle_Id: this.formRoute.value.vehicle_Id,
      active: this.formRoute.value.active == 1 ? true : false,
    }
    this.routesService.editRoute(this.formRoute.value.id, dataRoute).subscribe(data => {
      setTimeout(() => {
        this.getRoutesVehicles();
        this.msg.sucess(`¡Se editó la información de al ruta de manera exitosa!`);
        this.modalRoutes = false;
        this.formRoute.reset();
      }, 1000);
    }, error => {
      this.msg.errorHttp(`¡Ocurrió un error al editar los datos de la ruta!`, error);
      this.load = false;
    });
  }

  deleteRoute(id: number) {
    this.load = true;
    this.onReject();
    this.routesService.deleteRoute(id).subscribe(() => {
      this.msg.sucess(`¡Se ha elimado la ruta!`);
      setTimeout(() => this.getRoutesVehicles(), 1000);
    }, (error: HttpErrorResponse) => {
      this.msg.errorHttp(`¡Ocurrió un error al eliminar la ruta!`, error);
      this.load = false;
    });
  }

  deleteAllRoutes() {
    this.load = true;
    this.onReject();
    let count: number = 0;
    if (this.routesVehicles.length > 0) {
      this.routesVehicles.forEach(d => {
        let idRoute: number = d.id != undefined ? d.id : 0;
        this.routesService.deleteRoute(idRoute).subscribe(() => {
          count++;
          if (count == this.routesVehicles.length) {
            this.msg.sucess(`¡Se ha elimado la ruta!`);
            setTimeout(() => this.getRoutesVehicles(), 1000);
          }
        }, (error: HttpErrorResponse) => {
          this.msg.errorHttp(`¡Ocurrió un error al eliminar la ruta!`, error);
          this.load = false;
        });
      });
    } else {
      this.load = false;
      this.msg.error(`¡Debe haber rutas cargadas!`);
    }
  }

  showElection(single: boolean, id?: number) {
    if (single) this.formRoute.patchValue({ id: id });
    else this.formRoute.reset();
    let msg: string = single ? `El registro se eliminará ¿Desea continuar?` : `Se eliminarán todos los registros ¿Desea continuar?`;
    this.messageService.add({ severity: 'warn', key: 'decision', summary: msg, sticky: true });
  }

  onReject = () => this.messageService.clear('decision');

  filterData = ($event : any, field : string) => this.tableRoutes!.filter(($event.target as HTMLInputElement).value, field, 'contains');

}