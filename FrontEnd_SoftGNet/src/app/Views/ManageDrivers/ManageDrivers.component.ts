import { Component, OnInit, ViewChild } from '@angular/core';
import { Driver, DriversService } from '../../Services/Drivers/Drivers.service';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from '../../Services/Messages/Messages.service';
import { HttpErrorResponse } from '@angular/common/http';
import { States } from '../../Interfaces/States';
import moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ManageDrivers',
  templateUrl: './ManageDrivers.component.html',
  styleUrls: ['./ManageDrivers.component.css']
})
export class ManageDriversComponent implements OnInit {

  load: boolean = false;
  formDriver!: FormGroup;
  drivers: Array<Driver> = [];
  @ViewChild('tableDrivers') tableDrivers: Table | undefined;
  modalDrivers: boolean = false;
  states: Array<States> = [{ Id: 1, Name: 'Activo' }, { Id: 0, Name: 'Inactivo' }];

  constructor(private frmBuilder: FormBuilder,
    private msg: MessagesService,
    private driversService: DriversService,
    private messageService: MessageService,) {
    this.initForm();
  }

  ngOnInit() {
    this.getDrivers();
  }

  initForm() {
    this.formDriver = this.frmBuilder.group({
      Id: [null],
      Last_name: [null, Validators.required],
      First_name: [null, Validators.required],
      Ssn: [null, Validators.required],
      Dob: [null, Validators.required],
      Address: [null, Validators.required],
      City: [null, Validators.required],
      Zip: [null, Validators.required],
      Phone: [null, Validators.required],
      Active: [null, Validators.required],
    });
  }

  getDrivers() {
    this.load = true;
    this.driversService.getDrivers().subscribe(data => this.drivers = data, error => {
      this.msg.errorHttp(`¡No se obtuvo información de los conductores!`, error);
      this.load = false;
    }, () => this.load = false);
  }

  showModalDrivers(data?: Driver | null) {
    if (data != null) {
      this.formDriver.patchValue({
        Id: data.id,
        Last_name: data.last_name,
        First_name: data.first_name,
        Ssn: data.ssn,
        Dob: moment(data.dob).format('YYYY-MM-DD'),
        Address: data.address,
        City: data.city,
        Zip: data.zip,
        Phone: data.phone,
        Active: data.active == true ? 1 : 0,
      });
    }
    this.modalDrivers = true;
  }

  validateDriver() {
    if (this.formDriver.value.Id) this.editDriver();
    else this.createDriver();
  }

  createDriver() {
    this.load = true;
    let dataDriver: Driver = {
      last_name: this.formDriver.value.Last_name,
      first_name: this.formDriver.value.First_name,
      ssn: this.formDriver.value.Ssn,
      dob: this.formDriver.value.Dob,
      address: this.formDriver.value.Address,
      city: this.formDriver.value.City,
      zip: this.formDriver.value.Zip,
      phone: parseInt(this.formDriver.value.Phone),
      active: this.formDriver.value.Active == 1 ? true : false,
    }
    this.driversService.createDriver(dataDriver).subscribe(data => {
      this.modalDrivers = false;
      this.formDriver.reset();
      this.msg.sucess(`¡Se creó un conductor de manera exitosa!`);
      setTimeout(() => this.getDrivers(), 1000);
    }, error => {
      this.msg.errorHttp(`¡Ocurrió un error al crear el conductor!`, error);
      this.load = false;
    });
  }

  editDriver() {
    this.load = true;
    let dataDriver: Driver = {
      id: this.formDriver.value.Id,
      last_name: this.formDriver.value.Last_name,
      first_name: this.formDriver.value.First_name,
      ssn: this.formDriver.value.Ssn,
      dob: this.formDriver.value.Dob,
      address: this.formDriver.value.Address,
      city: this.formDriver.value.City,
      zip: this.formDriver.value.Zip,
      phone: parseInt(this.formDriver.value.Phone),
      active: this.formDriver.value.Active == 1 ? true : false,
    }
    this.driversService.editDriver(this.formDriver.value.Id, dataDriver).subscribe(data => {
      setTimeout(() => {
        this.getDrivers();
        this.msg.sucess(`¡Se editó la información del conductor de manera exitosa!`);
        this.modalDrivers = false;
        this.formDriver.reset();
      }, 1000);
    }, error => {
      this.msg.errorHttp(`¡Ocurrió un error al editar los datos del conductor!`, error);
      this.load = false;
    });
  }

  deleteDriver(id: number) {
    this.load = true;
    this.onReject();
    this.driversService.deleteDriver(id).subscribe(() => {
      this.msg.sucess(`¡Se ha elimado el conductor!`);
      setTimeout(() => this.getDrivers(), 1000);
    }, (error: HttpErrorResponse) => {
      this.msg.errorHttp(`¡Ocurrió un error al eliminar el condutor!`, error);
      this.load = false;
    });
  }

  deleteAllDrivers() {
    this.load = true;
    this.onReject();
    let count: number = 0;
    if (this.drivers.length > 0) {
      this.drivers.forEach(d => {
        let idDriver: number = d.id != undefined ? d.id : 0;
        this.driversService.deleteDriver(idDriver).subscribe(() => {
          count++;
          if (count == this.drivers.length) {
            this.msg.sucess(`¡Se ha elimado el conductor!`);
            setTimeout(() => this.getDrivers(), 1000);
          }
        }, (error: HttpErrorResponse) => {
          this.msg.errorHttp(`¡Ocurrió un error al eliminar el condutor!`, error);
          this.load = false;
        });
      });
    } else {
      this.load = false;
      this.msg.error(`¡Debe haber conductores cargados!`);
    }
  }

  showElection(single: boolean, id?: number) {
    if (single) this.formDriver.patchValue({ Id: id });
    else this.formDriver.reset();
    let msg: string = single ? `El registro se eliminará ¿Desea continuar?` : `Se eliminarán todos los registros ¿Desea continuar?`;
    this.messageService.add({ severity: 'warn', key: 'decision', summary: msg, sticky: true });
  }

  onReject = () => this.messageService.clear('decision');

  filterData = ($event: any, field: string) => this.tableDrivers!.filter(($event.target as HTMLInputElement).value, field, 'contains');

}