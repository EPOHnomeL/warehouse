import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse, User } from 'src/app/shared/types';
import { ApiService } from '../../services/api.service';

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
    
    const request$ = this.apiService.post(this.user, 'Users', 'createUser');

    request$.subscribe((response: ApiResponse) => { 
      if(!response.success){
        alert(response.message);
        return;
      }
    });
    this.router.navigateByUrl('/login'); // Go to login page
  }

  // Validates all user input
  validate(){
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
