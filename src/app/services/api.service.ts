import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationDetails } from '../components/register/register.component';
import { Observable } from 'rxjs';

export const URL = 'http://api.warehouse/';

export interface ApiResponse {
  success: boolean;
  message: string;
  values: [];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient ) {}
  // Create an observable(service), subscribe(components) to it.
  getAllUsers(){
    return this.http.get(URL + '?class=Users&func=getAllUsers');
  }

  createUser(newUser: RegistrationDetails){
    return this.http.post(URL + '?class=Users&func=createUser', newUser );
  }

  login( user: RegistrationDetails){
    return this.http.post(URL + '?class=Users&func=login', user );
  }

}
