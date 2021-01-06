import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public now: Date = new Date();

  datestamp = {
    year: '',
    month: '',
    day: ''
  }

  constructor() { }

  ngOnInit(): void {
    setInterval(() => { this.now = new Date(), 1});
    const date  = this.now.toLocaleDateString().split('/');
    this.datestamp.year = date[2];
    this.datestamp.month = date[1];
    this.datestamp.day = date[0];
  }

}
