import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor() {}
  // token:string = localStorage.getItem('userToken') || ' ';
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('userToken');
    if(token!= null){
      let newRqu = request.clone({headers:request.headers.set('token', token)});
      return next.handle(newRqu);
    }
    return next.handle(request);
  }
}
