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

  testVal = '';

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
    console.log(this.user);
  }

}
