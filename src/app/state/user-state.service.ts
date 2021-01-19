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

  userState: UserState = {
    username: '',
    isLogin: false,
    token: ''
  } 

  constructor() { }
}
