import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { RestApiService } from '../../rest-api.service'
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { GlobalServiceService } from '../../service/global-service.service';
import 'gl-ionic-background-video';
import { CartService } from 'src/app/service/cart.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private storage: Storage, private ServiceService: RestApiService, private cart: CartService, public menu: MenuController, private router: Router, private gs: GlobalServiceService, private nc: NavController) { }
  public errorMsglogin = false;
  public customloaderpartner;

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.menu.enable(false);
  }
  login(login: NgForm) {
    console.log(login);
    if (login.form.valid) {
      this.customloaderpartner = true;
      console.log(login.form.value);
      let loginformget = {
        "email": login.form.value.email,
        "password": login.form.value.password
      }
      console.log(loginformget);
      this.ServiceService.loginpartner(loginformget).subscribe((data) => {
        console.log(data);
        var fordataget;
        fordataget = data;
        this.customloaderpartner = false
        console.log(typeof (fordataget));
        if (fordataget.response.token !== null) {
          console.log("done");
          let id = fordataget.response.result[0].id
          this.storage.set("partnerLogindetails", JSON.stringify(data)).then((val) => {
            this.gs.partnerLogindetails = JSON.parse(val);
            console.log(this.gs.partnerLogindetails);
            this.ServiceService;
            this.gs.errorMsglogin = false;
            console.log(data);
            this.ServiceService.getcartitems(id).subscribe((data) => {

              var cartitemss;
              cartitemss = data;
              if (isEmpty(cartitemss)) {
                this.storage.set("cartitem", JSON.stringify([])).then((val) => {
                  this.gs.cartitem = JSON.parse(val);
                  console.log("check");
                  this.gs.login();
                });
              }
              else {
                this.storage.set("cartitem", JSON.stringify(cartitemss)).then((val) => {
                  this.gs.cartitem = JSON.parse(val);
                  this.gs.login();
                });
              }
              function isEmpty(obj) {
                for (var key in obj) {
                  if (obj.hasOwnProperty(key))
                    return false;
                }
                return true;
              }


            });

          });
        }
        else {
          this.errorMsglogin = true;
          this.gs.errorMsglogin = true;

        }


      },
        response => {
          console.log("POST call in error", response);
          this.customloaderpartner = false;
        },
        () => {
          console.log("The POST observable is now completed.");
          // this.loadercustom=false;
        }

      );
    }
  }
  Register() {

    this.nc.navigateForward('pages/register')
  }
  // pswd()
  // {


  //   this.ServiceService.updatepswd(loginformget).subscribe((data) => {
  //     console.log(data);
  //     var fordataget;
  //     fordataget = data;
  //     this.customloaderpartner = false
  //     console.log(typeof (fordataget));
  //     if (fordataget.response.token !== null) {
  //       console.log("done");
  //       let id = fordataget.response.result[0].id
  //       this.storage.set("partnerLogindetails", JSON.stringify(data)).then((val) => {
  //         this.gs.partnerLogindetails = JSON.parse(val);
  //         console.log(this.gs.partnerLogindetails);
  //         this.ServiceService;
  //         this.gs.errorMsglogin = false;
  //         console.log(data);
  //         this.ServiceService.getcartitems(id).subscribe((data) => {

  //           var cartitemss;
  //           cartitemss = data;
  //           if (isEmpty(cartitemss)) {
  //             this.storage.set("cartitem", JSON.stringify([])).then((val) => {
  //               this.gs.cartitem = JSON.parse(val);
  //               console.log("check");
  //               this.gs.login();
  //             });
  //           }
  //           else {
  //             this.storage.set("cartitem", JSON.stringify(cartitemss)).then((val) => {
  //               this.gs.cartitem = JSON.parse(val);
  //               this.gs.login();
  //             });
  //           }
  //           function isEmpty(obj) {
  //             for (var key in obj) {
  //               if (obj.hasOwnProperty(key))
  //                 return false;
  //             }
  //             return true;
  //           }


  //         });

  //       });
  //     }
  //     else {
  //       this.errorMsglogin = true;
  //       this.gs.errorMsglogin = true;

  //     }


  //   },
  //     response => {
  //       console.log("POST call in error", response);
  //       this.customloaderpartner = false;
  //     },
  //     () => {
  //       console.log("The POST observable is now completed.");
  //       // this.loadercustom=false;
  //     }

  //   );
  // }
  onClickForgotPassword() {

  }
  password: string = 'password';
  passwordIcon: string = 'eye-off';
  hideShowPassword() {
    this.password = this.password === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

}
