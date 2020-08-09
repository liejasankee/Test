

import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SMS, SmsOptions } from '@ionic-native/sms/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

//import { CallLog, CallLogObject } from '@ionic-native/call-log/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { RestApiService } from 'src/app/rest-api.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  message: string;

  constructor(
    private router: Router,
    private callNumber: CallNumber,
    private platform: Platform,
    private androidPermissions: AndroidPermissions,
    private sms1: SMS,
    private inappbrower: InAppBrowser,
    private rm: RestApiService

  ) { }

  ngOnInit() { }

  open(url: string) {
    const options: InAppBrowserOptions = {
      zoom: 'no',
      fullscreen: 'no',
      location: 'no',
      footer: 'yes',
      footercolor: '#CC000000',
      closebuttoncaption: 'Done',
      closebuttoncolor: '#00FFFF'
    }
    const browser = this.inappbrower.create(url, '_self', options);
  }

  call() {
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
  notify() {
    this.router.navigateByUrl('/folder/ShopAll/contact');
  }
}
