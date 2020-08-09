import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/rest-api.service';
import { GlobalServiceService } from 'src/app/service/global-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.page.html',
  styleUrls: ['./subcategories.page.scss'],
})
export class SubcategoriesPage implements OnInit {

  constructor(private ras: RestApiService, private router: Router, private gs: GlobalServiceService, private rm: ActivatedRoute) { }

  categories: any = [];

  load = this.gs.load;
  loadimg = true;

  ngOnInit() {
    let id = this.rm.snapshot.paramMap.get("id");
    console.log("hiiiiiii", id)

    this.ras.getsubcategories(id).subscribe((data) => {

      var list;
      list = data;
      console.log(data);
      this.categories = list.response;
      this.categories.splice(0, 1);


    },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        this.loadimg = false;

        console.log("The POST observable is now completed.");
      }

    );
  }
  forward(link, subcategories) {
    let check = 'yes';
    console.log(link, subcategories);
    this.router.navigate(['list', link, subcategories, check]);
  }

}
