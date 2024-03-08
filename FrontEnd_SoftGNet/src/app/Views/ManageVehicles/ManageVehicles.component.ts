import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicles, VehiclesService } from '../../Services/Vehicles/Vehicles.service';
import { MessagesService } from '../../Services/Messages/Messages.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table';
import { States } from '../../Interfaces/States';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ManageVehicles',
  templateUrl: './ManageVehicles.component.html',
  styleUrls: ['./ManageVehicles.component.css']
})
export class ManageVehiclesComponent implements OnInit {

  load : boolean = false;
  formVehicles!: FormGroup;
  vehicles: Array<Vehicles> = [];
  modalVehicles: boolean = false;
  @ViewChild('tableVehicules') tableVehicules : Table | undefined;
  states: Array<States> = [{Id: 1, Name: 'Activo'},{Id: 0, Name: 'Inactivo'}];
  
  constructor(private frmBuilder: FormBuilder,
    private vehiclesService: VehiclesService,
    private msg: MessagesService,
    private messageService: MessageService,) {
    this.initForm();
  }

  ngOnInit() {
    this.getVehicles();
  }

  initForm() {
    this.formVehicles = this.frmBuilder.group({
      id: [null],
      description: [null, Validators.required],
      year: [null, Validators.required],
      make: [null, Validators.required],
      capacity: [null, Validators.required],
      active: [null, Validators.required],
    });
  }

  getVehicles() {
    this.load = true;
    this.vehiclesService.getVehicless().subscribe(data => this.vehicles = data, error => {
      this.load = false;
      this.msg.errorHttp(`¡Ocurrió un problema al consultar la información de los vehiculos!`, error);
    }, () => this.load = false);
  }

  showModalVehicles(data?: Vehicles) {
    if (data) {
      this.formVehicles.patchValue({
        id: data.id,
        description: data.description,
        year: data.year,
        make: data.make,
        capacity: data.capacity,
        active: data.active ? 1 : 0,
      });
    }
    this.modalVehicles = true;
  }

  validateVehicles() {
    if (this.formVehicles.value.id) this.editVehicle();
    else this.createVehicle();
  }

  createVehicle() {
    this.load = true;
    let dataVehicle: Vehicles = {
      description: this.formVehicles.value.description,
      year: this.formVehicles.value.year,
      make: this.formVehicles.value.make,
      capacity: this.formVehicles.value.capacity,
      active: this.formVehicles.value.active == 1 ? true : false,
    }
    this.vehiclesService.createVehicles(dataVehicle).subscribe(data => {
      this.modalVehicles = false;
      this.formVehicles.reset();
      this.msg.sucess(`¡Se creó un vehiculo de manera exitosa!`);
      setTimeout(() => this.getVehicles(), 1000);
    }, error => {
      this.msg.errorHttp(`¡Ocurrió un error al crear el vehiculo!`, error);
      this.load = false;
    });
  }

  editVehicle() {
    this.load = true;
    let dataVehicle: Vehicles = {
      id: this.formVehicles.value.id,
      description: this.formVehicles.value.description,
      year: this.formVehicles.value.year,
      make: this.formVehicles.value.make,
      capacity: this.formVehicles.value.capacity,
      active: this.formVehicles.value.active == 1 ? true : false,
    }
    this.vehiclesService.editVehicles(this.formVehicles.value.id, dataVehicle).subscribe(data => {
      setTimeout(() => {
        this.getVehicles();
        this.msg.sucess(`¡Se editó la información del vehiculo de manera exitosa!`);
        this.modalVehicles = false;
        this.formVehicles.reset();
      }, 1000);
    }, error => {
      this.msg.errorHttp(`¡Ocurrió un error al editar los datos del vehiculo!`, error);
      this.load = false;
    });
  }

  deleteVehicle(id: number) {
    this.load = true;
    this.onReject();
    this.vehiclesService.deleteVehicles(id).subscribe(() => {
      this.msg.sucess(`¡Se ha elimado el conductor!`);
      setTimeout(() => this.getVehicles(), 1000);
    }, (error: HttpErrorResponse) => {
      this.msg.errorHttp(`¡Ocurrió un error al eliminar el condutor!`, error);
      this.load = false;
    });
  }

  deleteAllVehicles() {
    this.load = true;
    this.onReject();
    let count: number = 0;
    if (this.vehicles.length > 0) {
      this.vehicles.forEach(d => {
        let idVehicle: number = d.id != undefined ? d.id : 0;
        this.vehiclesService.deleteVehicles(idVehicle).subscribe(() => {
          count++;
          if (count == this.vehicles.length) {
            this.msg.sucess(`¡Se ha elimado el conductor!`);
            setTimeout(() => this.getVehicles(), 1000);
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
    if (single) this.formVehicles.patchValue({ id: id });
    else this.formVehicles.reset();
    let msg: string = single ? `El registro se eliminará ¿Desea continuar?` : `Se eliminarán todos los registros ¿Desea continuar?`;
    this.messageService.add({ severity: 'warn', key: 'decision', summary: msg, sticky: true });
  }

  onReject = () => this.messageService.clear('decision');

  filterData = ($event : any, field : any) => this.tableVehicules!.filter(($event.target as HTMLInputElement).value, field, 'contains');

}
