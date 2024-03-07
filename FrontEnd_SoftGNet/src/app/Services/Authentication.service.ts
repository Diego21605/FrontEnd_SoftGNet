import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  readonly routeAPI = environment.routeAPI;
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private http: HttpClient,
    private router: Router,) {

    let token: any = localStorage.getItem('user') == undefined ? '' : localStorage.getItem('user');
    this.userSubject = new BehaviorSubject(JSON.parse(token == '' ? null : token!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(data : User) {
    return this.http.post<User>(`${this.routeAPI}/Authentication/login`, data).pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
    }));
  }

  logout() {
    localStorage.clear();
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

}

export interface User {
  email: string;
  password: string;
  token?: string;
} 