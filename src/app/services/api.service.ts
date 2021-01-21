import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../components/register/register.component';
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

  createUser( user: User ){
    return this.http.post(URL + '?class=Users&func=createUser', user );
  }

  login( user: User ){
    return this.http.post(URL + '?class=Auth&func=login', user );
  }

  logout( usernameIn: string ){
    return this.http.post(URL + '?class=Auth&func=logout', { username: usernameIn });
  }

  updateUserDetails( usernameIn: string, newUsernameIn: string, newEmailIn: string){
    return this.http.post(URL + '?class=Users&func=updateUserDetails', { username: usernameIn, newUsername: newUsernameIn, newEmail: newEmailIn});
  }

}
