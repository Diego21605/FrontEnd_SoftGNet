import { Component, OnInit } from '@angular/core';
import { AuthenticationService, User } from './Services/Authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'FrontEnd_SoftGNet';
  user?: User | null;

  constructor(private authenticationService: AuthenticationService,) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.inactivity();
  }

  inactivity() {
    let t: any;
    let thirtyMinutes: number = 1800000; // 1 minuto son 60000 millisegundos, 30 minutos son 1800000 milisegundos
    window.onload = restartTime;
    document.onmousemove = restartTime;
    document.onkeypress = restartTime;
    document.onload = restartTime;
    document.onmousemove = restartTime;
    document.onmousedown = restartTime;
    document.ontouchstart = restartTime;
    document.onclick = restartTime;
    document.onscroll = restartTime;
    document.onkeypress = restartTime;

    const tiempoExcedido = () => {
      if (localStorage.getItem('Token')) this.authenticationService.logout();
      else {
        localStorage.clear();
        window.location.pathname = '/';
      }
    }

    function restartTime() {
      let stateConection: boolean = window.navigator.onLine;
      if (window.location.pathname != '/' || !stateConection) tiempoExcedido;
      clearTimeout(t);
      t = setTimeout(tiempoExcedido, thirtyMinutes);
    }
  }
}
