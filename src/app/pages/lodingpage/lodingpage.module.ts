import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LodingpagePageRoutingModule } from './lodingpage-routing.module';

import { LodingpagePage } from './lodingpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LodingpagePageRoutingModule
  ],
  declarations: [LodingpagePage]
})
export class LodingpagePageModule {}
