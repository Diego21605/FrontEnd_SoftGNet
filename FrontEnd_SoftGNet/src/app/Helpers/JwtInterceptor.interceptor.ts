import type { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export class JwtInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token') == undefined ? '' : localStorage.getItem('token');
    const isApiUrl = request.url.startsWith(environment.routeAPI);
    if (token && isApiUrl) request = request.clone({ setHeaders: { Authorization: `Bearer ${token.replaceAll('"', '')}` } });
    return next.handle(request);
  }
}
