import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-sideBar',
  templateUrl: './sideBar.component.html',
  styleUrls: ['./sideBar.component.css']
})
export class SideBarComponent implements OnInit {

  items: MegaMenuItem[] | undefined;
  
  constructor(private router : Router) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        command : () => this.router.navigateByUrl('/home'),
      },
      {
        label: 'Conductores',
        icon: 'pi pi-users',
        command : () => this.router.navigateByUrl('/drivers'),
      },
      {
        label: 'Horarios',
        icon: 'pi pi-calendar-plus',
        command : () => {
          localStorage.clear();
          this.router.navigateByUrl('/scheduler');
        },
      },
      {
        label: 'Rutas',
        icon: 'pi pi-directions',
        command : () => {
          localStorage.clear();
          this.router.navigateByUrl('/routes');
        },
      },
      {
        label: 'Vehiculos',
        icon: 'pi pi-car',
        command : () => this.router.navigateByUrl('/vehicules'),
      },
    ];
  }

}
