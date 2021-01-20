import { Injectable } from '@angular/core';

export interface UserState{
  username: string;
  isLogin: boolean;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  // Initialize userState
  userState: UserState = {
    username: '',
    isLogin: false,
    token: ''
  } 

  constructor() { }

  clearUserState(){
    this.userState = {
    username: '',
    isLogin: false,
    token: ''
    }   
  }
}
