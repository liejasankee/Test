import { Injectable, Type } from '@angular/core';
import { Storage } from '@ionic/storage';

import { HttpClient, HttpHeaders } from '@angular/common/http'; import { from } from 'rxjs';
import { GlobalServiceService } from './service/global-service.service';
@Injectable({
    providedIn: 'root'
})
export class RestApiService {



    public URL = "https://b2b.wownaturalfoods.com/api"

    constructor(private http: HttpClient, private storage: Storage, private gs: GlobalServiceService) {
        console.log("hi")

    }



    setToken() {

        let getlogindetails = this.gs.partnerLogindetails;
        var showedlogindetails = getlogindetails;
        console.log(typeof (showedlogindetails));
        return showedlogindetails.response.token;


    }

    savecartitems(cartitems) {
        let details = this.gs.partnerLogindetails;
        var pdetails = details;
        console.log(pdetails, typeof (pdetails));
        let id = pdetails.response.result[0].id;
        console.log(id, cartitems);

        return this.http.post(this.URL + "/partner/savecartitem/" + id, cartitems, {
            headers: new HttpHeaders({
                'Authorization': this.setToken(),
                'Content-Type': 'application/json',
            })
        });


    }
    getcartitems(id) {
        return this.http.get(this.URL + "/partner/getcartitem/" + id, {
            headers: new HttpHeaders({
                'Authorization': this.setToken(),
                'Content-Type': 'application/json',
            })
        });
    }

    productsbyid(id) {
        return this.http.get(this.URL + "/products/byid/" + id, {
            headers: new HttpHeaders({
                'Authorization': this.setToken(),
                'Content-Type': 'application/json',
            })
        });
    }
    loginpartner(loginget) {

        return this.http.post(this.URL + "/partner/login", loginget);
    }
    allproducts(link, check, subcat) {
        console.log(this.URL + "/products/" + link);
        let a;

        if (check === 'yes') {
            console.log(encodeURI(subcat))
            console.log(this.URL + "/products/" + link + "/" + encodeURI(subcat));

            a = this.http.get(this.URL + "/products/testsubcat/" + link + "/" + encodeURI(subcat), {
                headers: new HttpHeaders({
                    'Authorization': this.setToken(),
                    'Content-Type': 'application/json',
                })
            });

        }
        else {
            if (link == "sale") {
                console.log("h");
                a = this.http.get(this.URL + "/products/sale", {
                    headers: new HttpHeaders({
                        'Authorization': this.setToken(),
                        'Content-Type': 'application/json',
                    })
                });
            }
            else if ((link != null) && (link != "ShopAll") && (link != '') && (link != 'allprod')) {
                console.log("b");
                a = this.http.get(this.URL + "/products/test/" + link, {
                    headers: new HttpHeaders({
                        'Authorization': this.setToken(),
                        'Content-Type': 'application/json',
                    })
                });
            }
            else {
                console.log("a");
                a = this.http.get(this.URL + "/products", {
                    headers: new HttpHeaders({
                        'Authorization': this.setToken(),
                        'Content-Type': 'application/json',
                    })
                });
            }
        }
        console.log(typeof (a));
        return a;
    }
    partnersingup(data) {
        console.log(data);
        return this.http.post(this.URL + "/partner/register", data);
    }
    getCategories() {
        return this.http.get(this.URL + "/products/categorylist", {
            headers: new HttpHeaders({
                'Authorization': this.setToken(),
                'Content-Type': 'application/json',
            })
        })
    }
    getsubcategories(id) {
        return this.http.get(this.URL + "/products/Subcategorylist/" + id, {
            headers: new HttpHeaders({
                'Authorization': this.setToken(),
                'Content-Type': 'application/json',
            })
        });

    }
    partnerdetail() {
        console.log("hi")

        let details = this.gs.partnerLogindetails;
        let pdetails = details;
        let id = pdetails.response.result[0].id;
        console.log(this.URL + "/partner/Getpartnerdetail/" + id);
        return this.http.get(this.URL + "/partner/Getpartnerdetail/" + id, {
            headers: new HttpHeaders({
                'Authorization': this.setToken(),
                'Content-Type': 'application/json',
            })
        });

    }

    getSearch(id) {
        console.log(id);
        return this.http.get(this.URL + "/products/search/", {
            headers: new HttpHeaders({
                'Authorization': this.setToken(),
                'Content-Type': 'application/json',
            }),
            params: {
                id: id,
            }
        })
    }
    checkout(id) {
        console.log(id);
        let data = this.gs.cartitem;

        return this.http.post(this.URL + "/partner/getpartnerdetailcheckout/" + id, data, {
            headers: new HttpHeaders({
                'Authorization': this.setToken(),
                'Content-Type': 'application/json',
            })
        });
    }
    mail(id, data) {
        console.log(id, data);
        return this.http.post(this.URL + "/partner/mailfrompartner/" + id, data, {
            headers: new HttpHeaders({
                'Authorization': this.setToken(),
                'Content-Type': 'application/json',
            })
        });
    }


}
