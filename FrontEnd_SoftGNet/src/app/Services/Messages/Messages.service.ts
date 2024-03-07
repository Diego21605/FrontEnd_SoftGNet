import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  constructor(private messageService: MessageService,) { }

  error = (title: string, details: string = '', time: number = 3000) => this.messageService.add({severity:'error', summary: title, detail: details, life: time });
  
  errorHttp = (message: string, error: HttpErrorResponse) => this.error(message, `Error: ${error.statusText} | Status: ${error.status}`);

  warning = (title: string, details: string = '', time: number = 3000) => this.messageService.add({severity:'error', summary: title, detail: details, life: time });

  sucess = (title: string, details: string = '', time: number = 3000) => this.messageService.add({severity:'error', summary: title, detail: details, life: time });
}
