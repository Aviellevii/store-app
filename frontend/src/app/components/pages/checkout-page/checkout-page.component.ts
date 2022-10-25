import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  order:Order= new Order();
  checkoutForm!:FormGroup;
  constructor(cartService:CartService,
             private userService:UserService,
             private alertify:AlertifyService,
             private fb:FormBuilder,
             private router:Router,
             private orderService:OrderService) {
              const cart = cartService.getCart();
              this.order.items = cart.items;
              this.order.totalPrice = cart.totalPrice;
              }


  ngOnInit(): void {
    let {name,address} = this.userService.currentUser;
    this.checkoutForm = this.fb.group({
      name:[name,Validators.required],
      address:[address,Validators.required]
    })
  }
  get fc(){
    return this.checkoutForm.controls;
  }
  createOrder(){
    if(this.checkoutForm.invalid){
      this.alertify.error('please fills the input','invalid input');
      return;
    }

    if(!this.order.addressLatLng){
      this.alertify.error('please select your location on map', 'location');
      return;
    }

    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    this.orderService.create(this.order).subscribe({
      next:()=>{
        this.router.navigateByUrl('/payment');
      },
      error:(errorResponse) => {
        this.alertify.error(errorResponse.error,'Cart');
      }
    })
  }

}
