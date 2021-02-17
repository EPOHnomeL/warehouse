import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { ApiResponse, User } from './shared/types';
import { UserStateService } from './state/user-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'warehouse';

  user: User ={
    username: ''
  }

  isLoaded: boolean = false;

  constructor (private apiService: ApiService, private userstateService: UserStateService) {}
  // Super global on refesh
  ngOnInit(){
    this.autoLogin();
  }

  autoLogin(){
    // Check if there are things in the local storage
    if('username' in window.localStorage && 'token' in window.localStorage){
      // Get username and token
      this.user.username = window.localStorage.getItem('username')!;
      this.user.token = window.localStorage.getItem('token')!;

      // Send out request
      const request$ = this.apiService.post(this.user, 'Admin', 'authorizeUser');

      // When request finishes
      request$.subscribe((response: ApiResponse) => {
        this.isLoaded = true;              
        // Check if there are errors
        if(!response.success){
          alert(response.message);
          return;
        }

        // Set the user object to values returned from backend
        this.user.username = response.values.username;
        this.user.email = response.values.email;
        // Set login to true since user authorized
        this.user.isLogin = true;

        // Set the userstate accourdingly
        this.userstateService.setUserState(this.user);

        });
    } else {
      this.isLoaded = true;
    }
  }
}
