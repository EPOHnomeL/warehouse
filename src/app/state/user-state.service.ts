import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../components/register/register.component';

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

  userState$: BehaviorSubject<User> = new BehaviorSubject<User>(this.userState);

  constructor() { }

  setUserState(userStateIn: User){
    this.userState = userStateIn;
    this.userState$.next(this.userState);
  }

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
