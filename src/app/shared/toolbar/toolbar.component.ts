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

  user: RegistrationDetails = {
    username: '',
    email: '',
    password: '',
    role: ''
  }

  constructor( public userStateService: UserStateService, private apiService:ApiService, private router: Router ) { }

  ngOnInit(): void {
  }

  logoutClick(){

    this.user.username =  this.userStateService.userState.username;

    const request$ = this.apiService.logout( this.user );

    request$.subscribe((response: any) =>{
      if(!response.success){
        alert(response.message);
        return;
      }

      // Clear user state
      this.userStateService.userState = {
        username: '',
        isLogin: false,
        token: ''
      } 
      alert(response.message);
      this.router.navigateByUrl("/home");
    });
  }

}
