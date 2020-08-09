import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../service/global-service.service'
import { RestApiService } from '../../rest-api.service';
import { Storage } from '@ionic/storage';
import { Platform, NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-lastpage',
  templateUrl: './lastpage.page.html',
  styleUrls: ['./lastpage.page.scss'],
})
export class LastpagePage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private gs: GlobalServiceService,

    private rs: RestApiService,
    public menu: MenuController
  ) { }

  ngOnInit() {
    this.menu.enable(false);
    console.log("logoutcheck");
    console.log(this.gs.cartitem);
    let cartitems = this.gs.cartitem;
    console.log(typeof (cartitems));

    if ((cartitems !== [])) {
      this.rs.savecartitems(cartitems).subscribe((data) => {
        console.log(data);
        this.gs.logout();
        this.navCtrl.navigateRoot('/firstpage');

      })
    }
    else {
      this.gs.logout();
      this.navCtrl.navigateRoot('/firstpage');
    }
  }

}
