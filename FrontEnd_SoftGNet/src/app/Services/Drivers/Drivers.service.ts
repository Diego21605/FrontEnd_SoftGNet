import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DriversService {

  readonly routeAPI = environment.routeAPI;
  
  constructor(private http: HttpClient) { }

  getDrivers = (): Observable<any> => this.http.get<any>(`${this.routeAPI}/Drivers`);

  getDriverById = (id: number): Observable<any> => this.http.get<any>(`${this.routeAPI}/Drivers/${id}`);

  createDriver = (driver: Driver) => this.http.post(`${this.routeAPI}/Drivers`, driver);

  editDriver = (id: number, driver: Driver) => this.http.put(`${this.routeAPI}/Drivers/${id}`, driver);

  deleteDriver = (id: number) => this.http.delete(`${this.routeAPI}/Drivers/${id}`);
}

export interface Driver {
  id?: number;
  last_name: string;
  first_name: string;
  ssn: string;
  dob: Date;
  address: string;
  city: string;
  zip: string;
  phone: number;
  active: boolean;
}