import { Component, OnInit } from '@angular/core';
import { CartService, Product } from 'src/app/service/cart.service';
import { AlertController } from '@ionic/angular';
import { GlobalServiceService } from 'src/app/service/global-service.service';
import { RestApiService } from 'src/app/rest-api.service';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  constructor(private storage: Storage, private cartService: CartService, private alertCtrl: AlertController, private gs: GlobalServiceService, private rm: RestApiService, private modalCtrl: ModalController) { }
  cart: Product[] = [];

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }
  async checkout() {
    // Perfom PayPal or Stripe checkout process
    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'We will deliver your Products as soon as possible',
      buttons: ['OK']
    });
    alert.present();
    let emptycart = [];
    let details = this.gs.partnerLogindetails;
    let pdetails = details;
    console.log(pdetails.response.result[0].id);
    this.rm.checkout(pdetails.response.result[0].id).subscribe((data) => {
      this.rm.savecartitems(emptycart).subscribe((data) => {
        this.cartService.removeallProduct();

      })

    },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }
  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }
  close() {
    this.modalCtrl.dismiss();
  }

}
