import { Component, OnInit } from '@angular/core';
import { CartService, Product } from 'src/app/service/cart.service';
import { Router } from '@angular/router';
import { GlobalServiceService } from 'src/app/service/global-service.service';
import { RestApiService } from 'src/app/rest-api.service';
import { ModalController } from '@ionic/angular';
import { OrderComponent } from 'src/app/component/order/order.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart: Product[] = [];

  constructor(private cartService: CartService, private router: Router, private gs: GlobalServiceService, private modalCtrl: ModalController, private rm: RestApiService) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    console.log(this.cart);
    this.gs.change = true;
  }
  ngOnDestroy() {
    this.gs.change = false;
    console.log("hi");
  }

  decreaseCartItem(product) {
    this.cartService.minus(product);
  }
  increaseCartItem(product) {
    this.cartService.plus(product);
  }
  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }
  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }
  async confirmorder() {
    let modal = await this.modalCtrl.create({
      component: OrderComponent,
    });
    modal.present();
  }
}
