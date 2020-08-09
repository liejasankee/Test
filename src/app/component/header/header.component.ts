import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { BehaviorSubject } from 'rxjs';
import { GlobalServiceService } from '../../service/global-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;

  constructor(private cartService: CartService, private router: Router, private gs: GlobalServiceService) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.products = this.cartService.getProducts();
    this.cartItemCount = this.cartService.getCartItemCount();


  }
  async openCart() {

    this.router.navigate(['cart'])
  }
  openoffer() {
    this.router.navigate(['/folder/sale-item'])
  }
  opencatalog() {
    this.router.navigate(['/list/allprod/no', '']);
  }

}

