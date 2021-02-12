import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserStateService } from '../state/user-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor( private userStateService: UserStateService, private router: Router) { }

  canActivate(): boolean{
    if (!this.userStateService.userState$.value["isLogin"]) {
      this.router.navigateByUrl("/home");
      return false;
    }
    return true;
  }
}
