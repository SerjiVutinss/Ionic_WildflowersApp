import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WildflowerFilterPage } from './wildflower-filter';

@NgModule({
  declarations: [
    WildflowerFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(WildflowerFilterPage),
  ],
  exports: [
    WildflowerFilterPage
  ]
})
export class WildflowerFilterPageModule {}
