import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse, ApiService } from 'src/app/services/api.service';
import { UserState, UserStateService } from 'src/app/state/user-state.service';
import { RegistrationDetails } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: RegistrationDetails = {
    username: '',
    email: '',
    password: '',
    role: ''
  }

  constructor( private apiService: ApiService, private router: Router, private userStateService: UserStateService ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if (!this.validate()){  // Early exit when validation fails
      return;
    }

    const request$ = this.apiService.login(this.user);

    request$.subscribe((response: any) =>{
      // Error handling
      if(!response.success){
        alert(response.message);
        return;
      }
      // Set user state
      this.userStateService.userState = {
        username : response.values['username'],
        token : response.values['token'], 
        email: response.values['email'],
        isLogin : true,
      };   

      alert(response.message);  // TODO remove
      // Navigate to products
      this.router.navigateByUrl("/profile");
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
