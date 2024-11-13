
import { ChangeDetectionStrategy, Component, Inject, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public logInForm: FormGroup;

  constructor(
    private fb: FormBuilder, private authService: AuthService, private router: Router, private session: SessionStorageService){
      this.initForm()
  }
  private initForm(){
    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  public onSubmit(){
    if(this.logInForm.valid){
      this.authService.logIn({email: this.logInForm.value['email'], password: this.logInForm.value['password']}).subscribe((data) =>{
        this.session.setItem('email', data.email);
        this.session.setItem('token', data.token);
        this.router.navigateByUrl('/past')
    },(error) =>{
      this.logInForm.reset();
    })}
  }

}
