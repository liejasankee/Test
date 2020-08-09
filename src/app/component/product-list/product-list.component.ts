import { Component, OnInit, Input } from '@angular/core';
import { RestApiService } from '../../rest-api.service'
import { FolderPage } from '../../folder/folder.page'
import { ListPage } from '../../pages/list/list.page';
import { CartService } from '../../service/cart.service';
import { Router } from '@angular/router';
import { Events } from 'ionic-angular';
import { GlobalServiceService } from 'src/app/service/global-service.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  // BuyonegetOne: boolean;
  // InSale: boolean;
  products: any = [];
  @Input() link: any;
  @Input() check: any;
  @Input() subcategory: any;
  carts: any = {
    path: 'assets/lottie/cart.json',
    renderer: 'svg',
    autoplay: true,
    loop: true
  };

  constructor(private ras: RestApiService, private gs: GlobalServiceService, private cartService: CartService, private router: Router, public events: Events) {
    events.subscribe('backPressed', () => {
      console.log("check", this.check, "subcat", this.subcategory)
      this.ras.allproducts(this.link, this.check, this.subcategory).subscribe((data) => {
        this.loadimg = false;

        console.log(data);
        var uproducts;
        let cartitems = this.cartService.getCart();

        uproducts = data;
        this.products = uproducts.response;
        Object.keys(this.products).forEach(key => {
          this.products[key].count = 1;
          this.products[key].amount = 1;
        });
        console.log("cartitems -> ", cartitems);
        for (let productIndex = 0; productIndex < this.products.length; productIndex++) {
          for (let cartIndex = 0; cartIndex < cartitems.length; cartIndex++) {
            if (this.products[productIndex].id === cartitems[cartIndex].id) {
              this.products[productIndex] = cartitems[cartIndex];
              break;
            }
          }
        }




        console.log(uproducts.response.buyonegetone);
        console.log(this.products);
      }, response => {
        console.log("POST call in error", response);
      },
        () => {
          console.log("The POST observable is now completed.");

        }
      )


    });
  }
  load = this.gs.load;
  loadimg = true;
  ngOnInit() {
    console.log(this.link);
    this.ras.allproducts(this.link, this.check, this.subcategory).subscribe((data) => {
      this.loadimg = false;
      console.log(data);
      var uproducts;
      let cartitems = this.cartService.getCart();
      uproducts = data;
      this.products = uproducts.response;
      Object.keys(this.products).forEach(key => {
        this.products[key].amount = 1;
      });
      console.log("cartitems -> ", cartitems);
      for (let productIndex = 0; productIndex < this.products.length; productIndex++) {
        for (let cartIndex = 0; cartIndex < cartitems.length; cartIndex++) {
          if (this.products[productIndex].id === cartitems[cartIndex].id) {

            this.products[productIndex] = cartitems[cartIndex];


            break;
          }
        }
      }





      console.log(uproducts.response.buyonegetone);
      console.log(this.products);
    }, response => {
      console.log("POST call in error", response);
    },
      () => {

        console.log("The POST observable is now completed.");

      }
    )
  }


  openproductdetail(id) {
    console.log(id);
    this.router.navigate(['/productdetail', id]);
  }

  addToCart(product) {
    this.cartService.addProduct(product);
  }
  decreaseProductCount(product) {
    if (product.amount > 1) {
      this.cartService.minus(product);
    }
  }
  increaseProductCount(product) {
    this.cartService.plus(product);
  }

}
