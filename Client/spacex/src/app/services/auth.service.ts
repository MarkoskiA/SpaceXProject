import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogIn, UserToken } from '../models/models';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'});
  public url: string = 'https://localhost:7255/auth/';

  constructor(private http: HttpClient, private router: Router, private session: SessionStorageService) { }

  //login
  public logIn(user: UserLogIn): Observable<UserToken>{
     return this.http.post<UserToken>(this.url+'login', user);
  }

  //register
  public register(user:UserLogIn): Observable<string>{
    return this.http.post<string>(this.url+'register', user);
  }

  //logout
  public logOut(): void{
    this.http.post<string>(this.url+'logout', null).subscribe(() =>{
      alert("logged out");
      this.session.clear();
      this.router.navigateByUrl('/login')
    })
  }

}

