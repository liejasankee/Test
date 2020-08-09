import { Component, OnInit, Input } from '@angular/core';
import { Events } from 'ionic-angular';
import { CartService } from '../../service/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { GlobalServiceService } from 'src/app/service/global-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  products: any = [];

  constructor(private ras: RestApiService, private gs: GlobalServiceService, private cartService: CartService, private rm: ActivatedRoute, private router: Router, private events: Events) { }
  load = this.gs.load;
  loadimg = true;
  ngOnInit() {
    let id = this.rm.snapshot.paramMap.get("id");
    console.log(id);
    this.ras.productsbyid(id).subscribe((data) => {
      console.log(data);
      var uproducts;
      uproducts = data;
      this.products = uproducts.response;
      console.log(this.products);
      let productIndex = 0;
      this.products[0].amount = 1;

      let cartitems = this.cartService.getCart();
      for (let cartIndex = 0; cartIndex < cartitems.length; cartIndex++) {
        if (this.products[productIndex].id === cartitems[cartIndex].id) {
          this.products[productIndex] = cartitems[cartIndex];
          productIndex++;

          break;
        }

      }

      console.log(this.products);
      console.log(cartitems);
    }, response => {
      console.log("POST call in error", response);
    },
      () => {
        this.loadimg = false;
        console.log("The POST observable is now completed.");

      }
    )



  }

  addToCart() {
    console.log(this.products[0])
    this.cartService.addProduct(this.products[0]);
  }
  back() {
    this.events.publish('backPressed');
    this.router.initialNavigation();
  }
  decreaseProductCount() {

    this.cartService.minus(this.products[0]);
  }
  increaseProductCount() {
    this.cartService.plus(this.products[0]);
  }

}

