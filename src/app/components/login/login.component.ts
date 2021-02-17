import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ApiResponse, User } from 'src/app/shared/types';
import { UserStateService } from 'src/app/state/user-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = {
    username: '',
    email: '',
    password: '',
    role: ''
  }

  constructor( private apiService: ApiService, private router: Router, private userStateService: UserStateService ) { }

  ngOnInit(): void {
  }

  loginUser(){
    if (!this.validate()){  // Early exit when validation fails
      return;
    }

    const request$ = this.apiService.post(this.user, 'Admin', 'login');

    request$.subscribe((response: ApiResponse) =>{
      // Error handling
      if(!response.success){
        alert(response.message);
        return;
      }

      // Set the local storage varibles TODO move to state
      window.localStorage.username = response.values.username;
      window.localStorage.token = response.values.token;

      // Set user state
      this.userStateService.setUserState({
        username : response.values.username,
        token : response.values.token, 
        email: response.values.email,
        isLogin : true,
      });   

      // Navigate to products
      this.router.navigateByUrl("/home");
    });
  }

  // Validates all user input
  validate(){
    if(this.user.username === '' ||
      this.user.password === ''){
        alert("Please fill in all forms");
        return false;   
       }

    return true;
  }

}
