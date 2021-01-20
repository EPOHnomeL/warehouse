import { Component, OnInit } from '@angular/core';
import { UserStateService } from 'src/app/state/user-state.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  username: string = '';
  email: string = '';

  constructor( private userStateService: UserStateService) { }

  ngOnInit(): void {
    this.username = this.userStateService.userState.username;
    this.email =  this.userStateService.userState.email;
  }

  onSubmit(){
    // autherize user
    // call update user

  }

}
