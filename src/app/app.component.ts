import { Component, OnInit } from '@angular/core';
import { User } from './shared/types';

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

  constructor () {}
  // Super global on refesh
  ngOnInit(){
      this.user.username = window.localStorage.getItem('username')!;
      this.user.token = window.localStorage.getItem('token')!;
    

  }

}
