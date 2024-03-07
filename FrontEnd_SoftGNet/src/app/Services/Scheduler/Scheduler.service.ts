import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  readonly routeAPI = environment.routeAPI;
  
  constructor(private http: HttpClient) { }

  getAllSchedules = (): Observable<any> => this.http.get<any>(`${this.routeAPI}/Schedules`);

  getSchedules = (): Observable<any> => this.http.get<any>(`${this.routeAPI}/Schedules/getSchedulers`);

  getSchedulesById = (id: number): Observable<any> => this.http.get<any>(`${this.routeAPI}/Schedules/${id}`);

  createSchedules = (scheduler: Scheduler) => this.http.post(`${this.routeAPI}/Schedules`, scheduler);

  editSchedules = (id: number, scheduler: Scheduler) => this.http.put(`${this.routeAPI}/Schedules/${id}`, scheduler);

  deleteSchedules = (id: number) => this.http.delete(`${this.routeAPI}/Schedules/${id}`);
}

export interface Scheduler {
  id?: number;
  route_Id: number;
  week_Num: number;
  from: Date;
  to: Date;
  active: boolean;
}