import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const URL = 'http://api.warehouse/';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient ) {}
  // Create an observable(service), subscribe(components) to it.

  post(objIn: any, classIn: string, funcIn: string): any{
    return this.http.post(URL + `?class=${classIn}&func=${funcIn}`, objIn);
  }

}
