import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WildflowersPage } from './wildflowers';
import { WildflowerCardPage, WildflowerDetailPage } from '..';



import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    WildflowersPage,
    WildflowerCardPage
  ],
  imports: [
    IonicPageModule.forChild(WildflowersPage),
    PipesModule
  ],
})
export class WildflowersPageModule {}
