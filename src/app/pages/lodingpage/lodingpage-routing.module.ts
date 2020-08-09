import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LodingpagePage } from './lodingpage.page';

const routes: Routes = [
  {
    path: '',
    component: LodingpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LodingpagePageRoutingModule {}
