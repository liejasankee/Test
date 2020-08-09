import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from 'src/app/service/global-service.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.page.html',
  styleUrls: ['./first-page.page.scss'],
})
export class FirstPagePage implements OnInit {
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };


  constructor(private router: Router) {

  }

  ngOnInit() {
  }
  signin() {
    this.router.navigateByUrl('pages/register');
  }
  // login() {
  //   this.router.navigateByUrl('pages/login');

  // }

}
