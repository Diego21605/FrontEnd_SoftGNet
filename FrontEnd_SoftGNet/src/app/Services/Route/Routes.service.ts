import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class RoutesService {

  readonly routeAPI = environment.routeAPI;
  
  constructor(private http: HttpClient) { }

  getAllRoutes = (): Observable<any> => this.http.get<any>(`${this.routeAPI}/RoutesVehicles`);

  getRoutes = (): Observable<any> => this.http.get<any>(`${this.routeAPI}/RoutesVehicles/getRoutes`);

  getRouteById = (id: number): Observable<any> => this.http.get<any>(`${this.routeAPI}/RoutesVehicles/${id}`);

  createRoute = (Route: Routes) => this.http.post(`${this.routeAPI}/RoutesVehicles`, Route);

  editRoute = (id: number, Route: Routes) => this.http.put(`${this.routeAPI}/RoutesVehicles/${id}`, Route);

  deleteRoute = (id: number) => this.http.delete(`${this.routeAPI}/RoutesVehicles/${id}`);
}

export interface Routes {
  id?: number;
  descripcion: string;
  driver_Id: number
  vehicle_Id: number;
  active: boolean;
}