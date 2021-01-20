import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationDetails } from 'src/app/components/register/register.component';
import { ApiService } from 'src/app/services/api.service';
import { UserStateService } from 'src/app/state/user-state.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  
  isLogin: boolean = false;
  username: string = '';

  constructor( public userStateService: UserStateService, private apiService:ApiService, private router: Router ) { }

  ngOnInit(): void {
    this.isLogin = this.userStateService.userState.isLogin;
    this.username = this.userStateService.userState.username;
  }

  logoutClick(){

    const request$ = this.apiService.logout( this.userStateService.userState.username );

    request$.subscribe((response: any) =>{
      if(!response.success){
        alert(response.message);
        return;
      }

      // Clear user state
      this.userStateService.clearUserState();
      alert(response.message);  // TODO remove
      // Navigate to home
      this.router.navigateByUrl("/home");
    });
  }

}
