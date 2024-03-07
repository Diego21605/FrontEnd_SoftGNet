import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Routes, RoutesService } from '../../Services/Route/Routes.service';
import { MessagesService } from '../../Services/Messages/Messages.service';
import { Scheduler, SchedulerService } from '../../Services/Scheduler/Scheduler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ManageScheduler',
  templateUrl: './ManageScheduler.component.html',
  styleUrls: ['./ManageScheduler.component.css']
})

export class ManageSchedulerComponent implements OnInit {

  load : boolean = false;
  formScheduler!: FormGroup;
  routesVehicles: Array<Routes> = [];
  scheduler: Array<Scheduler> = [];
  modalScheduler: boolean = false;
  @ViewChild('tableScheduler') tableScheduler : Table | undefined;
  states: Array<States> = [{Id: 1, Name: 'Activo'},{Id: 0, Name: 'Inactivo'}];

  constructor(private frmBuilder: FormBuilder,
    private msg: MessagesService,
    private routesService: RoutesService,
    private schedulerService: SchedulerService,) {
    this.initForm();
  }

  ngOnInit() {
    this.getRoutesVehicles();
    this.getSchduler();
  }

  initForm() {
    this.formScheduler = this.frmBuilder.group({
      id: [null],
      route_Id: [null, Validators.required],
      week_Num: [null, Validators.required],
      from: [null, Validators.required],
      to: [null, Validators.required],
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

  getSchduler() {
    this.load = true;
    this.schedulerService.getSchedules().subscribe(data => this.scheduler = data, error => {
      this.load = false;
      this.msg.errorHttp(`¡Ocurrió un error al obtener la informaión de los horarios!`, error);
    }, () => this.load = false);
  }

  showModalSchduler(data?: any) {
    if (data) {
      this.formScheduler.patchValue({
        id: data.id,
        route_Id: data.route_Id,
        week_Num: data.week_Num,
        from: data.from,
        to: data.to,
        active: data.active == true ? 1 : 0,
      });
    }
    this.modalScheduler = true;
  }

  validateSchduler() {
    if (this.formScheduler.value.id) this.editScheduler();
    else this.createScheduler();
  }

  createScheduler() {
    this.load = true;
    let dataScheduler: Scheduler = {
      route_Id: this.formScheduler.value.route_Id,
      week_Num: this.formScheduler.value.week_Num,
      from: this.formScheduler.value.from,
      to: this.formScheduler.value.to,
      active: this.formScheduler.value.active == 1 ? true : false,
    }
    this.schedulerService.createSchedules(dataScheduler).subscribe(data => {
      this.modalScheduler = false;
      this.formScheduler.reset();
      this.msg.sucess(`¡Se creó un horario de manera exitosa!`);
      setTimeout(() => this.getRoutesVehicles(), 1000);
    }, error => {
      this.msg.errorHttp(`¡Ocurrió un error al crear el horario!`, error);
      this.load = false;
    });
  }

  editScheduler() {
    this.load = true;
    let dataScheduler: Scheduler = {
      id: this.formScheduler.value.id,
      route_Id: this.formScheduler.value.route_Id,
      week_Num: this.formScheduler.value.week_Num,
      from: this.formScheduler.value.from,
      to: this.formScheduler.value.to,
      active: this.formScheduler.value.active == 1 ? true : false,
    }
    this.schedulerService.editSchedules(this.formScheduler.value.id, dataScheduler).subscribe(data => {
      setTimeout(() => {
        this.getSchduler();
        this.msg.sucess(`¡Se editó la información del horario de manera exitosa!`);
        this.modalScheduler = false;
        this.formScheduler.reset();
      }, 1000);
    }, error => {
      this.msg.errorHttp(`¡Ocurrió un error al editar los datos del horario!`, error);
      this.load = false;
    });
  }

  deletedataScheduler(id: number) {
    this.load = true;
    this.schedulerService.deleteSchedules(id).subscribe(() => {
      this.msg.sucess(`¡Se ha elimado el horario!`);
      setTimeout(() => this.getSchduler(), 1000);
    }, (error: HttpErrorResponse) => {
      this.msg.errorHttp(`¡Ocurrió un error al eliminar el horario!`, error);
      this.load = false;
    });
  }

  deleteAllScheduler() {
    this.load = true;
    let count: number = 0;
    if (this.scheduler.length > 0) {
      this.scheduler.forEach(d => {
        let idScheduler: number = d.id != undefined ? d.id : 0;
        this.schedulerService.deleteSchedules(idScheduler).subscribe(() => {
          count++;
          if (count == this.scheduler.length) {
            this.msg.sucess(`¡Se ha elimado el horario!`);
            setTimeout(() => this.getSchduler(), 1000);
          }
        }, (error: HttpErrorResponse) => {
          this.msg.errorHttp(`¡Ocurrió un error al eliminar el horario!`, error);
          this.load = false;
        });
      });
    } else {
      this.load = false;
      this.msg.error(`¡Debe haber horarios cargados!`);
    }
  }

  filterData = ($event : any, campo : any) => this.tableScheduler!.filter(($event.target as HTMLInputElement).value, campo, 'contains');

}

interface States {
  Id: number;
  Name: string;
}
