import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, ApiResponse } from '../../services/api.service';

export interface User {
  username: string;
  newUsername?: string;
  email?: string;
  newEmail?: string;
  password?: string;
  role?: string;
  token?: string;
  isLogin?: boolean;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  confPass = '';
  confEmail = '';

  user: User = {
    username: '',
    email: '',
    password: '',
    role: ''
  }
  
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if (!this.validate()){  // Early exit when validation fails
      return;
    }
    
    const request$ = this.apiService.createUser(this.user);

    request$.subscribe((response: any) => {  // TODO ApiResponse 
      if(!response.success){
        alert(response.message);
        return;
      }
    });
    
    alert("User successfully created");
    this.router.navigateByUrl('/login'); // go to login page
  }

  // Validates all user input
  validate(){
    if(this.user.username === '' ||
      this.user.password === '' ||
      this.user.email === '' ||
      this.confEmail === '' || 
      this.confPass === ''){
        alert("Please fill in all forms");
        return false;   
       }

    if (this.confEmail !== this.user.email){ 
      alert("Emails do not match");
      return false;
    }

    if(this.user.email.indexOf('@') === -1){
      alert("Invalid email");
      return false;
    }

    if(this.user.password !== this.confPass){
      alert("Passwords do not match");
      return false;
    }

    if(this.user.username.indexOf(' ') !== -1){
      alert("Spaces in username");
      return false;
    }  
    
    if(this.user.role === ''){
      alert("Please select a role");
      return false;
    }

    return true;
  }

}
