import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';
import { LottieAnimationViewModule } from 'ng-lottie';
import { ListPage } from './list.page';
import { ComponentModule } from 'src/app/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    LottieAnimationViewModule,
    ListPageRoutingModule
  ],
  declarations: [ListPage]
})
export class ListPageModule { }
