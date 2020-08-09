import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { GlobalServiceService } from '../global-service.service';
@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private gs: GlobalServiceService) {
    console.log(" authgaurd check", this.gs.isAuthenticated());

  }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log("error mesg login ->", this.gs.isAuthenticated());
    if (this.gs.isAuthenticated() !== true) {

      console.log("true");
      this.router.navigate(["pages/login"]);
      return false;
    }

    return true;
  }
}