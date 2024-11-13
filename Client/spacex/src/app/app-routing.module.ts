import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SpaceXForumComponent } from './components/spacex-forum/spacex-forum.component';
import { LaunchDetailsComponent } from './components/launch-details/launch-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/space-x.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'latest',
   canActivate: [AuthGuard],
    component: SpaceXForumComponent
  },
  {
    path: 'upcoming',
   canActivate: [AuthGuard],
    component: SpaceXForumComponent
  },
  {
    path: 'past',
   canActivate: [AuthGuard],
    component: SpaceXForumComponent
  },
  {
    path: ':id',
   canActivate: [AuthGuard],
    component: LaunchDetailsComponent
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
