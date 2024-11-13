import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.initForm();
  }
  ngOnInit(): void { }
  private initForm(){
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required]]
    })
  }

  public onSubmit(){
    if(this.registerForm.valid){
      if(this.registerForm.value['password'] === this.registerForm.value['repeatPassword']){
        this.authService.register({email: this.registerForm.value['email'], password: this.registerForm.value['password']}).subscribe(data => {
          alert("Succesfully registered")
          this.router.navigateByUrl('/login')
        })
      } else {

      }
    }
  }
}
