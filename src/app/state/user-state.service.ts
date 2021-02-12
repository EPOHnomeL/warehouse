import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  
  // Initialize userState
  private userState: User = {
    username: '',
    isLogin: false,
    token: '',
    email: '',
  } 

  // Create public observable which the component can subscribe to to acces the values realtime
  userState$: BehaviorSubject<User> = new BehaviorSubject<User>(this.userState);

  constructor() { }

  // Set the userstate
  setUserState(userStateIn: User){
    this.userState = userStateIn;
    this.userState$.next(this.userState);
  }

  // Clear the userstate
  clearUserState(){
    this.userState = {
    username: '',
    isLogin: false,
    token: '',
    email: '',
    }
    this.userState$.next(this.userState);   
  }
}
