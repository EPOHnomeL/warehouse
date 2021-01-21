import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserStateService } from 'src/app/state/user-state.service';
import { User } from '../register/register.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = {
    username: '',
    newUsername: '',
    newEmail: '',
    token: '',
  }


  constructor( private userStateService: UserStateService, private apiService: ApiService) { }

  ngOnInit(): void {
    // Initialize variables
    this.userStateService.userState$.subscribe((userstate: User) => {
      this.user.username = userstate.username;
      this.user.token = userstate.token!;
      this.user.newEmail = userstate.email!;
    });

    // Get placeholder values
    this.user.newUsername = this.user.username;
  }

  updateUser(){
    // const request$ = this.apiService.authorize( this.newUsername, this.token);

    // request$.subscribe((response: any) => {
    //   if(!response.success){
    //     alert(response.message);
    //     this.userStateService.clearUserState();
    //     return;
    //   }

    //   alert(response.message);  //TODO remove
    // });

    const request2$ = this.apiService.updateUserDetails( this.user.username, this.user.newUsername!, this.user.newEmail!);

    request2$.subscribe((response: any) => {
      if(!response.success){
        alert(response.message);
        return;
      }

      alert(response.message);  //TODO remove

    });
  }

}
