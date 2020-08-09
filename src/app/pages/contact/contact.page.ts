import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from 'src/app/service/global-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(private gs: GlobalServiceService) {

  }
  notification = [{ "post": "Hi " + this.gs.firstname + "! we Welcome you to Our WoW Natural Foods Store" }, { "post": "Wait for New Offers to come soon" }]
  ngOnInit() {
    console.log("hi")
  }

}
