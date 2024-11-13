import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, type OnInit } from '@angular/core';
import { filter, fromEvent, map, skip } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
  public showLogIn = false;
  public email: string | null = null;
  constructor(private service: AuthService, private session: SessionStorageService, private cd: ChangeDetectorRef){}

  ngOnInit(): void {
    this.session.sessionStorageChange$.pipe().subscribe((data) => {
      this.email = this.session.getItem('email');
      if(data === null && this.email === null){
        this.showLogIn = true;
      }
      else if(data){
        this.showLogIn = false;
      }
      this.cd.markForCheck()
    })
   }

   public Logout(){
    this.service.logOut();
   }

}
