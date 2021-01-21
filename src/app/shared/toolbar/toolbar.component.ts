import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/components/register/register.component';
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
    this.userStateService.userState$.subscribe((userstate: User) => {
      this.isLogin = userstate.isLogin;
      this.username = userstate.username;
    });
  }

  logoutClick(){

    const request$ = this.apiService.logout( this.username );

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
