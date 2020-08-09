import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LottieAnimationViewModule } from 'ng-lottie';

import { IonicModule } from '@ionic/angular';

import { SubcategoriesPageRoutingModule } from './subcategories-routing.module';

import { SubcategoriesPage } from './subcategories.page';
import { ComponentModule } from 'src/app/component/component.module';


@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    FormsModule,
    LottieAnimationViewModule,
    IonicModule,
    SubcategoriesPageRoutingModule
  ],
  declarations: [SubcategoriesPage]
})
export class SubcategoriesPageModule { }
