import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
import { GlobalServiceService } from '../../service/global-service.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  constructor(private ras: RestApiService, private gs: GlobalServiceService, private router: Router) { }
  viewtype: boolean = true;
  categories: any = [];
  load = this.gs.load;
  loadimg = true;

  ngOnInit() {

    this.ras.getCategories().subscribe((data) => {

      var list;
      list = data;

      this.categories = list.response;
      console.log(this.categories);
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
  getviewtype(type) {
    if (type == 'grid') {
      this.viewtype = false;

    }
    else {
      this.viewtype = true;
    }
    console.log(this.viewtype);
    return this.viewtype;


  }
  opensubcategory(id) {
    console.log("hiiiiiii")
    this.router.navigate(['/folder/subcategory', id]);
  }


}
