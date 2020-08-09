import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthGuardService } from './service/services/auth-guard.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LottieAnimationViewModule } from 'ng-lottie';
import { Events } from 'ionic-angular';
import { RouterModule } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { NgxProgressiveImgLoaderModule } from 'ngx-progressive-img-loader';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { IonicStorageModule } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';



// import { CallLog } from '@ionic-native/call-log/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    RouterModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule, LazyLoadImageModule, HttpClientModule, LottieAnimationViewModule.forRoot(), NgxProgressiveImgLoaderModule
  ],
  providers: [
    StatusBar,
    AuthGuardService,
    ScreenOrientation,
    CallNumber,
    SplashScreen,
    SMS,
    AndroidPermissions,
    { provide: Events, useClass: Events },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InAppBrowser

  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
