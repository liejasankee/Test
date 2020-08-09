import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from 'src/app/service/global-service.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-lodingpage',
  templateUrl: './lodingpage.page.html',
  styleUrls: ['./lodingpage.page.scss'],
})
export class LodingpagePage implements OnInit {

  constructor(private gs: GlobalServiceService, private router: Router, private storage: Storage) {

    this.storage.get('partnerLogindetails').then((partnerLogindetails) => {
      if (!partnerLogindetails) {


        this.router.navigateByUrl('/firstpage')
      }
    });

  }
  ngOnInit() {
  }


}
