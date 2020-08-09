import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';
import { ComponentModule } from '../component/component.module'
import { FolderPage } from './folder.page';
import { LottieAnimationViewModule } from 'ng-lottie';
import { LazyLoadImageModule } from 'ng-lazyload-image';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    LazyLoadImageModule,
    LottieAnimationViewModule,
    FolderPageRoutingModule
  ],

  declarations: [FolderPage],
})
export class FolderPageModule { }
