import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    passwordRepeat: new FormControl('')
  });


  isWrongPass = false;

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
  }

  login(){
    const val = this.loginForm.value;

    if(val.username && val.password)
    {
      this.authService.login(val.username,val.password)
        .subscribe(
          isLoggedIn => {
            this.isWrongPass = !isLoggedIn;
            if(isLoggedIn){
              const nextUrl = this.authService.isUserAdmin() ? '/admin' : '';
              this.router.navigateByUrl(nextUrl);           
            } 
        },
        err => {
          this.isWrongPass = err;
        }
        );
    }
  }

  register(){
    const val = this.registerForm.value;
  }

}
