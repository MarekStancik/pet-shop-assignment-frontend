import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(){
    const val = this.loginForm.value;

    if(val.username && val.password)
    {
      this.authService.login(val.username,val.password)
        .subscribe(
          () => {
            console.log('User is logged in');
            
        });
    }
  }

}
