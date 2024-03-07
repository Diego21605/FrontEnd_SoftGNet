import { Component, OnInit, ViewChild } from '@angular/core';
import { Driver, DriversService } from '../../Services/Drivers/Drivers.service';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from '../../Services/Messages/Messages.service';

@Component({
  selector: 'app-ManageDrivers',
  templateUrl: './ManageDrivers.component.html',
  styleUrls: ['./ManageDrivers.component.css']
})
export class ManageDriversComponent implements OnInit {

  load : boolean = false;
  formDriver!: FormGroup;
  drivers: Array<Driver> = [];
  selectedDrivers: Array<Driver> = [];
  @ViewChild('tableDrivers') tableDrivers : Table | undefined;
  modalDrivers: boolean = false;
  states: Array<States> = [{Id: 1, Name: 'Activo'},{Id: 0, Name: 'Inactivo'}];

  constructor(private frmBuilder: FormBuilder,
    private msg: MessagesService,
    private driversService: DriversService,) {
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

  showModalDrivers(data?: any) {
    if (data != null) {
      this.formDriver.patchValue({
        Id: data.id,
        Last_name: data.last_name,
        First_name: data.first_name,
        Ssn: data.ssn,
        Dob: data.dob,
        Address: data.address,
        City: data.city,
        Zip: data.zip,
        Phone: data.phone,
        Active: data.active,
      });
    }
    this.modalDrivers = true;
  }

  validateDriver() {
    if (this.formDriver.value.Id) this.editDriver();
    else this.createDriver();
  }

  createDriver() {
    let dataDriver: Driver = {
      Last_name: this.formDriver.value.Last_name,
      First_name: this.formDriver.value.First_name,
      Ssn: this.formDriver.value.Ssn,
      Dob: this.formDriver.value.Dob,
      Address: this.formDriver.value.Address,
      City: this.formDriver.value.City,
      Zip: this.formDriver.value.Zip,
      Phone: parseInt(this.formDriver.value.Phone),
      Active: this.formDriver.value.Active == 1 ? true : false,
    }
    this.driversService.createDriver(dataDriver).subscribe(data => {
      this.modalDrivers = false;
      this.formDriver.reset();
      this.msg.sucess(`¡Se creó un conductor de manera exitosa!`);
      this.load = false;
    }, error => {
      this.msg.errorHttp(`¡Ocurrió un error al crear el conductor!`, error);
      this.load = false;
    });
  }

  editDriver() {
    let dataDriver: Driver = {
      Id: this.formDriver.value.Id,
      Last_name: this.formDriver.value.Last_name,
      First_name: this.formDriver.value.First_name,
      Ssn: this.formDriver.value.Ssn,
      Dob: this.formDriver.value.Dob,
      Address: this.formDriver.value.Address,
      City: this.formDriver.value.City,
      Zip: this.formDriver.value.Zip,
      Phone: parseInt(this.formDriver.value.Phone),
      Active: this.formDriver.value.Active == 1 ? true : false,
    }
    this.driversService.editDriver(this.formDriver.value.Id, dataDriver).subscribe(data => {
      this.msg.sucess(`¡Se editó la información del conductor de manera exitosa!`);
      this.load = false;
    }, error => {
      this.msg.errorHttp(`¡Ocurrió un error al editar los datos del conductor!`, error);
      this.load = false;
    });
  }

  filterData = ($event : any, campo : any) => this.tableDrivers!.filter(($event.target as HTMLInputElement).value, campo, 'contains');

}

interface States {
  Id: number;
  Name: string;
}