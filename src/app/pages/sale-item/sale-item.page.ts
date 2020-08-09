import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale-item',
  templateUrl: './sale-item.page.html',
  styleUrls: ['./sale-item.page.scss'],
})
export class SaleItemPage implements OnInit {

  constructor() { }


  saleitem = "sale";
  ngOnInit() {
  }

}
