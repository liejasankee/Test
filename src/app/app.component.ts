import { Component, OnInit } from '@angular/core';
import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalServiceService } from './service/global-service.service'
import { Router } from '@angular/router';
import { RestApiService } from './rest-api.service';
import { Storage } from '@ionic/storage';
import { CartService } from './service/cart.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { observable, Observable } from 'rxjs';
import { AppPage } from 'e2e/src/app.po';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  firstname;




  public log = [
    {
      title: ' Log off',
      url: '/firstpage',
      icon: 'assets/icon/logout.svg'
    }
  ];
  public shopall = [{
    title: 'Shop All',
    url: '/folder/ShopAll',
    icon: 'assets/icon/spices.svg'

  }];

  display: boolean = false;
  categories: any;
  appPages: any = [];
  login: any = [];

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private screenOrientation: ScreenOrientation,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private gs: GlobalServiceService,
    private router: Router,
    private rs: RestApiService,
    public menu: MenuController,
    public cart: CartService
  ) {

    console.log("inside constructor");
    // set to landscape
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.gs.authenticationState.subscribe(async state => {


      if (state) {
        console.log("inside constructor state");
        console.log("user is logged in");
        this.menu.enable(true);
        this.cart.initiate();
        this.navCtrl.navigateRoot(['/folder/ShopAll']);
        this.display = true;
        console.log(this.gs.firstname, this.firstname);
        this.firstname = this.gs.firstname;
        console.log(this.gs.firstname, this.firstname);
        let p = new Promise((resolver) => {
          this.rs.getCategories().subscribe((data) => {
            this.login[0] = {
              title: this.firstname,
              url: '/firstpage',
              icon: 'assets/icon/login.svg'
            }

            var list;
            list = data;
            this.categories = list.response;
            console.log(this.categories, this.categories.length);
            for (let i = 0; i < this.categories.length; i++) {
              console.log("hjkjhgfd", i, this.categories.length);
              this.appPages[i] = {};
              console.log()
              this.appPages[i].url = "/folder/" + this.categories[i].route1;
              this.appPages[i].title = this.categories[i].categories_name;
              this.appPages[i].icon = "https://b2b.wownaturalfoods.com/api/asset/svg/" + this.categories[i].image_url + ".svg"
              console.log(this.appPages[i])
            }
            resolver();
            this.gs.appPages = this.appPages;
            console.log(this.gs.appPages);

          },
            response => {
              console.log("POST call in error", response);
            },
            () => {
              console.log("The POST observable is now completed.");
            }

          );
        });
        await p;
        this.initializeApp();
        const path = window.location.pathname.split('folder/')[1];
        if (path !== undefined) {
          this.selectedIndex = this.gs.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
        }
        //this.appPages = this.gs.appPages;

        // console.log(this.gs.firstname, this.firstname);
        this.splashScreen.hide();
      }
      else {
        console.log("inside constructor else");
        console.log("user is NOT logged in");
        this.navCtrl.navigateRoot('/lodingpage');
        this.splashScreen.hide();
      }


    });
  }

  initializeApp() {
    console.log("inside initialzeapp");
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 4000);
    });
  }

  ngOnInit() {
    console.log("inside ngoniit");
    this.gs.backbtn = false;

  }

  async logout() {

    this.router.navigateByUrl('/lastpage');
  }

}
