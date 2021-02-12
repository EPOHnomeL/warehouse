import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ApiResponse, User } from 'src/app/shared/types';
import { UserStateService } from 'src/app/state/user-state.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = {
    username: '',
    token: '',
  }

  constructor( private userStateService: UserStateService, private apiService: ApiService) { }

  ngOnInit(): void {
    // Initialize variables
    this.userStateService.userState$.subscribe((user: User) => { 
      this.user = user;
      this.user.newUsername = this.user.username;
      this.user.newEmail = this.user.email!;
    });
  }

  updateUser(){
    // Create observable for updating user info
    const request$ = this.apiService.post( this.user , 'Users', 'updateUserDetails');

    // Subscription to do after the user's details are updated
    request$.subscribe((response: ApiResponse) => {
      if(!response.success){
        alert(response.message);
        return;
      }

      this.user.username = this.user.newUsername!;
      this.user.email = this.user.newEmail;
      this.user.newUsername = '';
      this.user.newEmail = '';
      this.userStateService.setUserState(this.user);

      alert(response.message);
    });
  }

}
