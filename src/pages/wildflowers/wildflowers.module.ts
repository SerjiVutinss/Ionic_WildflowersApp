import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WildflowersPage } from './wildflowers';

@NgModule({
  declarations: [
    WildflowersPage,
  ],
  imports: [
    IonicPageModule.forChild(WildflowersPage),
  ],
})
export class WildflowersPageModule {}
