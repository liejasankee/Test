import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MailformComponent } from '../component/mailform/mailform.component';
import { GlobalServiceService } from '../service/global-service.service';
import { RestApiService } from '../rest-api.service';
import { Location } from "@angular/common";
import { Platform } from '@ionic/angular';
import { SMS, SmsOptions } from '@ionic-native/sms/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

//import { CallLog, CallLogObject } from '@ionic-native/call-log/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  route: string;
  image = 'https://images.unsplash.com/photo-1422004707501-e8dad229e17a?fm=jpg';
  load = this.gs.load;
  loadimg = true;
  category: any = {
    path: 'assets/lottie/categories.json',
    renderer: 'svg',
    autoplay: true,
    loop: true
  };
  sms: any = {
    path: 'assets/lottie/sms.json',
    renderer: 'svg',
    autoplay: true,
    loop: true
  };
  call: any = {
    path: 'assets/lottie/call.json',
    renderer: 'svg',
    autoplay: true,
    loop: true
  };
  mail: any = {
    path: 'assets/lottie/mail.json',
    renderer: 'svg',
    autoplay: true,
    loop: true
  };
  sale: any = {
    path: 'assets/lottie/sales.json',
    renderer: 'svg',
    autoplay: true,
    loop: true
  };
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  all = '';
  myInput: any;

  list: any = [];
  listt: boolean = true;
  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };
  public backbtn: boolean = false;
  constructor(
    private gs: GlobalServiceService,
    private activatedRoute: ActivatedRoute,
    public modalController: ModalController,
    private ras: RestApiService,
    private router: Router,
    private callNumber: CallNumber,
    private platform: Platform,
    private androidPermissions: AndroidPermissions,
    private sms1: SMS,
    private rm: RestApiService) {

  }
  categories: any = [];
  openCategory(category) {
    console.log(category);
    if (category.sub_categories === 1) {
      this.router.navigate(['/folder/subcategory', category.id]);
      return;
    }
    this.router.navigateByUrl('folder/' + category.route);
  }
  openCategorypage() {
    this.router.navigateByUrl('folder/ShopAll/categories');
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: MailformComponent

    });
    return await modal.present();

  }
  ngOnInit() {

    if (this.router.url === "/folder/ShopAll") {
      this.gs.backbtn = true;
      console.log("route -> ", this.router.url);
      console.log("route bool ->", this.gs.backbtn);
      this.backbtn = this.gs.backbtn;
    }
    else {
      this.gs.backbtn = false;
      console.log(this.router.url);
      console.log(this.gs.backbtn);
      this.backbtn = this.gs.backbtn;
    }

    console.log("inside ngOnInit");
    console.log(this.backbtn);
    console.log(this.gs.backbtn);

    console.log(this.backbtn);
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("folder", this.folder);
    this.ras.getCategories().subscribe((data) => {

      var list;
      list = data;
      this.categories = list.response;
      this.loadimg = false;


    },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      }

    );
  }
  onInput(event) {

    console.log(event);
    console.log(event.srcElement.value);
    console.log(event, event.keyCode, event.keyIdentifier);
    const searchTerm = event.srcElement.value;

    if (!searchTerm) {

      this.listt = true;
      console.log(this.list);

      return;
    }
    else {
      this.ras.getSearch(searchTerm).subscribe((data) => {
        console.log(data);
        var datum;
        datum = data;
        if (datum.response.length > 0) {
          this.listt = false;
          this.list = datum.response;
          console.log(this.list);
        }
        else {
          this.list = [{ product_name: "Sorry no such product" }]
        }



      })

    }

  }
  calling() {
    this.callNumber.callNumber('12025692196', true)
      .then(res => { })
      .catch(err => alert('Error launching dialer' + err));
  }
  async sendTxt() {
    console.log("hi")
    var options: SmsOptions = {
      replaceLineBreaks: false,
      android: {
        intent: 'INTENT'
      }
    }


    this.rm.partnerdetail().subscribe((data) => {
      var partnerdetails;
      partnerdetails = data;
      let obj = partnerdetails.response[0];
      this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(() => {
        this.sms1.send('12025692196', "Name: " + obj.username + ", Store Name:" + obj.username + ", Address :" + obj.address + "Enter product Details:", options);
      }).catch((err) => {
        alert(JSON.stringify(err) + "error");
      });
    });

  };

}
