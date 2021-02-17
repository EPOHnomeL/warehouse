import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserStateService } from 'src/app/state/user-state.service';
import { ApiResponse, User } from '../types';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  
  user: User = {
    username: ''
  };

  constructor( public userStateService: UserStateService, private apiService:ApiService, private router: Router ) { }

  ngOnInit(): void {
    this.userStateService.userState$.subscribe((user: User) => {
      this.user = user;
    });
  }

  logoutClick(){

    // Send request to logout
    const request$ = this.apiService.post( this.user, 'Admin', 'logout' );

    request$.subscribe((response: ApiResponse) => {
      if(!response.success){
        alert(response.message);
        return;
      }

      // Clear local storage
      window.localStorage.clear();
      // Clear user state
      this.userStateService.clearUserState();
      // Navigate to home
      this.router.navigateByUrl("/home");
    });
  }

}
