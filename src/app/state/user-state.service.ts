import { Injectable } from '@angular/core';

export interface UserState{
  username: string;
  isLogin: boolean;
  token: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  // Initialize userState
  userState: UserState = {
    username: '',
    isLogin: false,
    token: '',
    email: '',
  } 

  constructor() { }

  clearUserState(){
    this.userState = {
    username: '',
    isLogin: false,
    token: '',
    email: '',
    }   
  }
}
