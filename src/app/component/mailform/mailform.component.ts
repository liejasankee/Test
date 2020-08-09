import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestApiService } from 'src/app/rest-api.service';
import { Storage } from '@ionic/storage';
import { GlobalServiceService } from 'src/app/service/global-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mailform',
  templateUrl: './mailform.component.html',
  styleUrls: ['./mailform.component.scss'],
})
export class MailformComponent implements OnInit {


  constructor(private alertCtrl: AlertController, public modalCtrl: ModalController, private rm: RestApiService, private storage: Storage, private gs: GlobalServiceService) { }
  todo = {}

  ngOnInit() { }
  dismissModal() {
    console.log("hi");
    this.modalCtrl.dismiss();

  }
  async logForm() {

    let details = this.gs.partnerLogindetails;
    let pdetails = details;
    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Message!',
      message: 'We will Contact as soon as possible',
      buttons: ['OK']
    });
    alert.present();

    console.log(pdetails.response.result[0].id);
    console.log(this.todo);
    this.rm.mail(pdetails.response.result[0].id, this.todo).subscribe((data) => {
      this.dismissModal();
    },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });

  }
}
