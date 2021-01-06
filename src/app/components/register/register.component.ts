import { Component, OnInit } from '@angular/core';

export interface RegistrationDetails {
  username: string;
  name: string;
  surname: string;
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
    name: '',
    password: '',
    surname: '',
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    if (!this.validate()){  // Early exit when validation fails
      return;
    }

    console.log(this.user);
  }

  validate(){
    if (this.confEmail !== this.user.email){ 
      alert("Emails do not match");
      return false;
    }

    

    return true;
  }

}
