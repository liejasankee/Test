import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

import { GlobalServiceService } from '../service/global-service.service';
export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
  check: boolean;

}
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
  data: Product[] = [
    { id: 0, name: 'Pizza Salami', price: 8.99, amount: 0, check: true }
  ];

  constructor(private gs: GlobalServiceService, private storage: Storage) {


  }
  async initiate() {
    console.log(this.gs.errorMsglogin);
    let val = this.gs.cartitem;
    if (val == null) {
      console.log(val);
      this.cart = [];
      this.cartItemCount.next(0);

    }
    else {
      this.cart = val;
      this.cartItemCount.next(this.cart.length);

    }
    console.log(this.cart);
  }
  getProducts() {
    return this.data;
  }

  getCart() {

    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product) {
    let added = false;
    console.log("success");
    for (let p of this.cart) {
      if (p.id === product.id) {
        console.log(this.cart);
        added = true;
        break;
      }

    }
    if (!added) {

      let newProduct = product;
      console.log(product);

      console.log(product);
      this.cart.push(newProduct);
      this.storage.set("cartitem", JSON.stringify(this.cart)).then((val) => {
        this.gs.cartitem = JSON.parse(val);
      });
      this.cartItemCount.next(this.cartItemCount.value + 1);
      console.log(this.cart);
    }

  }

  plus(product) {

    product.amount += 1;
    this.storage.set("cartitem", JSON.stringify(this.cart)).then((val) => {
      this.gs.cartitem = JSON.parse(val);
    });



  }



  minus(product) {


    if (product.amount > 1) {

      product.amount--;
      this.storage.set("cartitem", JSON.stringify(this.cart)).then((val) => {
        this.gs.cartitem = JSON.parse(val);
      });

    }



  }

  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount = 1;
        this.cartItemCount.next(this.cartItemCount.value - 1);
        this.cart.splice(index, 1);
        this.storage.set("cartitem", JSON.stringify(this.cart)).then((val) => {
          this.gs.cartitem = JSON.parse(val);
        });
      }
    }
  }
  removeallProduct() {
    for (let [index, p] of this.cart.entries()) {
      console.log(index, this.cart.length, "check");
      if (index == (this.cart.length - 1)) {
        this.cart.splice(0);
        this.cartItemCount.next(this.cartItemCount.value - this.cartItemCount.value);
        this.storage.remove('cartitem').then(() => {
          this.gs.cartitem = [];
        })
      }

    }
  }

}
