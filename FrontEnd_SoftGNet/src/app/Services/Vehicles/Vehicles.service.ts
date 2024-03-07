import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  readonly routeAPI = environment.routeAPI;
  
  constructor(private http: HttpClient) { }

  getVehicless = (): Observable<any> => this.http.get<any>(`${this.routeAPI}/Vehicles`);

  getVehiclesById = (id: number): Observable<any> => this.http.get<any>(`${this.routeAPI}/Vehicles/${id}`);

  createVehicles = (vehicles: Vehicles) => this.http.post(`${this.routeAPI}/Vehicles`, vehicles);

  editVehicles = (id: number, vehicles: Vehicles) => this.http.put(`${this.routeAPI}/Vehicles/${id}`, vehicles);

  deleteVehicles = (id: number) => this.http.delete(`${this.routeAPI}/Vehicles/${id}`);
}

export interface Vehicles {
  id?: number;
  description: string;
  year: number;
  make: number;
  capacity: number;
  active: boolean;
}