import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ApiResponse, Product, ProductCategories, User } from 'src/app/shared/types';
import { UserStateService } from 'src/app/state/user-state.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.scss']
})
export class AddproductsComponent implements OnInit {

  productCategories = ProductCategories;
  keys: string[] = [];

  user : User = {
    username: ''
  };

  product: Product = {
    name : '',
    category : ProductCategories.Clothes,
    quantity : 0
  };

  responseObj: any;

  constructor(private apiService: ApiService, private userstateService: UserStateService) { }

  ngOnInit(): void {
    this.keys = Object.keys(this.productCategories).filter(k => !isNaN(Number(k)));
    this.userstateService.userState$.subscribe((user) => {
      this.user.username = user.username;
      this.user.token = user.token;
    });
  }

  addProduct(){

    // Merge user and product to send it as json
    this.responseObj = {...this.user, ...this.product};

    // Create request
    const request$ = this.apiService.post(this.responseObj, 'Products', 'createProduct');

    // Subcribe to request 
    request$.subscribe((response: ApiResponse) => { 
      // Check if there are errors
      if(!response.success){
        alert(response.message);
        return;
      }

      alert('Product succesfully created');
      // Clear product information
      this.product = {
        name : '',
        category : ProductCategories.Clothes,
        quantity : 0
      };
    });    
  }

  onChange(){
    if(this.product.quantity > 100){
      this.product.quantity = 100;
    }
    if(this.product.quantity < 1){
      this.product.quantity = 1;
    }
  }

}
