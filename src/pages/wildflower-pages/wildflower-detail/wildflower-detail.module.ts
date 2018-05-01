import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WildflowerDetailPage } from './wildflower-detail';

@NgModule({
  declarations: [
    WildflowerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WildflowerDetailPage),
  ],
})
export class WildflowerDetailPageModule {}
