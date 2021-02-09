import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { tap } from "rxjs/operators";

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {
  constructor(
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 400:
            console.log('interceptor: 400');
            break;
          case 404:
            console.log('interceptor: 404');
            break;
          case 500:
            console.log('interceptor: 500');
            break;
          case 401:
            this.router.navigate(['login']);
            break;
          case 403:
            console.log('interceptor: 403');
            break;
          default:
            console.log(error);
        }
        const msgerror = (error && error.error && error.error.message) || error.statusText;
        return throwError(msgerror);
      })
    );
  }
}