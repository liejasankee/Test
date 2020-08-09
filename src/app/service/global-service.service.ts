import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {


  public errorMsglogin;
  public backbtn;
  public count;
  public token;
  public username;
  public splitname;
  public firstname;
  change: boolean = false;
  load: any = {
    path: 'assets/lottie/load.json',
    renderer: 'svg',
    autoplay: true,
    loop: true
  };
  authenticationState = new BehaviorSubject(false);
  public appPages: any = [];
  cartitem: any;
  partnerLogindetails: any;
  constructor(private storage: Storage,
    private platform: Platform) {
    console.log(this.authenticationState.value)
    console.log("global constructor");
    this.platform.ready().then(async () => {
      this.checkToken();
      this.storage.get('cartitem').then((cartitem) => {
        if (cartitem) {
          this.cartitem = JSON.parse(cartitem);
          console.log(cartitem);
        }
        else {
          console.log("no val1 found");
        }
      })
      this.storage.get('partnerLogindetails').then((partnerLogindetails) => {
        if (partnerLogindetails) {
          this.partnerLogindetails = JSON.parse(partnerLogindetails);
          console.log(partnerLogindetails);

        }
        else {
          console.log("no val2 found");
        }
      });
    });

    console.log(this.cartitem);
    console.log(this.partnerLogindetails);

  }
  checkToken() {
    this.storage.get('partnerLogindetails').then((partnerLogindetails) => {
      if (partnerLogindetails) {
        this.partnerLogindetails = JSON.parse(partnerLogindetails);
        if ((this.partnerLogindetails.response.token !== null)) {
          this.username = (this.partnerLogindetails.response.result[0].username);
          this.splitname = this.username.split(' ');
          this.firstname = this.splitname[0];
          console.log(this.firstname);
          this.authenticationState.next(true);
        }
      }
      else {
        this.authenticationState.next(false);
      }
    });

  }
  login() {
    console.log(this.authenticationState.value);
    this.username = (this.partnerLogindetails.response.result[0].username);
    this.splitname = this.username.split(' ');
    this.firstname = this.splitname[0];
    console.log(this.firstname);
    this.authenticationState.next(true);
  }
  logout() {
    console.log(this.authenticationState.value);
    this.storage.clear();
    this.authenticationState.next(false);
  }
  isAuthenticated() {
    return this.authenticationState.value;
  }

}
