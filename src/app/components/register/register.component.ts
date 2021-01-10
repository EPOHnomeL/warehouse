import { Component, OnInit } from '@angular/core';
import { ApiService, Response } from '../../services/api.service';

export interface RegistrationDetails {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  confPass = '';
  confEmail = '';

  user: RegistrationDetails = {
    username: '',
    email: '',
    password: '',
  }
  
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if (!this.validate()){  // Early exit when validation fails
      return;
    }

    // ....$ = observable
    console.log(this.user);

    const request$ = this.apiService.createUser(this.user);
    request$.subscribe((response: any) => {  // whats wrong here ? 
      if(!response.success){
        alert(response.message);
        return;
      }
      console.log(response);
      // ...code
    });
  }

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

    return true;
  }

}
