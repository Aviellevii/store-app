import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  Quantity = 0;
  user!:User;
  constructor(cartService:CartService,private userService:UserService) { 
    cartService.getCartObvservable().subscribe(newCart => {
      this.Quantity = newCart.totalCount;
    })
    userService.userObservable.subscribe((Newuser:User)=>{
      this.user = Newuser
    })
  }

  ngOnInit(): void {
  }
  logout(){
     this.userService.logOut();
  }
  get IsAuth(){
    return this.user.token;
  }

}
