import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { SpaceXForumComponent } from './components/spacex-forum/spacex-forum.component';
import { AuthService } from './services/auth.service';
import { SpaceXDataService } from './services/spacex-data.service';
import { LaunchDetailsComponent } from './components/launch-details/launch-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './components/card/card.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { SessionStorageService } from './services/session-storage.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    RegisterComponent,
    SpaceXForumComponent,
    LaunchDetailsComponent,
    CardComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, SpaceXDataService,SessionStorageService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
