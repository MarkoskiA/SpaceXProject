import type { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private session: SessionStorageService){}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.session.getItem('token') != null) {
      const clonedReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + this.session.getItem('token'))
      });
      return next.handle(clonedReq).pipe(
          tap(
              succ => { },
              err => {
                  if (err.status == 401){
                      this.session.removeItem('token');
                      this.session.removeItem('email');
                      this.router.navigateByUrl('/login');
                  }
                  else if(err.status == 403)
                  this.router.navigateByUrl('/forbidden');
              }
          )
      )
  }
  else
      return next.handle(req.clone()).pipe(
    tap(
      succ=>{},
      err=>{
        if(err.status === 401){
          alert("You are not logged in");
          this.router.navigateByUrl('/login');
        }
      }
    ));
  }
}
