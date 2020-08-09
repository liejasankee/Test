import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { RestApiService } from '../../rest-api.service'
import { Router } from '@angular/router';
import { EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { FolderPage } from 'src/app/folder/folder.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public errormsgfromSingupshow = false;
  public errormsgfromSingup
  public successMsgpopup;
  public singupsuccess = false;
  public customloaderpartner;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,
    private ServiceService: RestApiService,
    private router: Router
  ) { }

  address: string;
  getAddress: any = {};
  public location;
  public searchElementRef: ElementRef;
  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();

  autocompleteInput: string;
  queryWait: boolean;



  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.signupForm = this.fb.group({
      'FirstName': [null, Validators.required],
      'LastName': [null, Validators.required],
      'StoreName': [null, Validators.required],
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, Validators.required],
      'confirmpassword': [null, Validators.required],
      'contact': [null, Validators.required],
      'address': [null, Validators.required],
      'Zipcode': [null, Validators.required],

    });

  }
  singuppartnerclick(formvaluesingup) {
    console.log(formvaluesingup.value)
    if (formvaluesingup.form.valid) {
      console.log("hi");
      this.errormsgfromSingupshow = false;
      this.customloaderpartner = true
      var usernamepartner = formvaluesingup.value.firstName + " " + formvaluesingup.value.lastName


      console.log(usernamepartner)
      console.log(formvaluesingup.value.password);
      let formData = {
        "username": usernamepartner,
        "pass_word": formvaluesingup.value.password,
        "email": formvaluesingup.value.email,
        "store_contact": formvaluesingup.value.contact,
        "store_name": formvaluesingup.value.storeName,
        "Address": formvaluesingup.value.address,
        "zipcode": formvaluesingup.value.Zipcode,
      }

      this.ServiceService.partnersingup(formData).subscribe((data) => {
        console.log(data);
        this.customloaderpartner = false;
        var getresp
        getresp = data;

        if (getresp.response != null) {
          this.successMsgpopup = true;
          this.singupsuccess = true;
          this.router.navigateByUrl('/folder/ShopAll');
          console.log(this.singupsuccess);
        }
        // else (getresp.response.duplicate_entry_for_column === "email")
        else {
          this.errormsgfromSingupshow = true;
          this.errormsgfromSingup = "This email is already registered please change"
        }
      });
    }

  }

}
