import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WildflowerDetailPage } from './wildflower-detail';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    WildflowerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WildflowerDetailPage),
    PipesModule
  ],
})
export class WildflowerDetailPageModule {}
