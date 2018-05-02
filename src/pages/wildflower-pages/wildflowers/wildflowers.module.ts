import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WildflowersPage } from './wildflowers';
import { WildflowerCardPage, WildflowerDetailPage } from '..';
import { PipesModule } from '../../../pipes/pipes.module';

import { HeaderModule } from '../../../components/header/header.module';
import { WildflowerFilterPage } from '../wildflower-filter/wildflower-filter';
import { WildflowerFilterPageModule } from '../wildflower-filter/wildflower-filter.module';

@NgModule({
  declarations: [
    WildflowersPage,
    WildflowerCardPage,
    //WildflowerFilterPage
  ],
  imports: [
    IonicPageModule.forChild(WildflowersPage),
    PipesModule,
    WildflowerFilterPageModule
    //HeaderModule
  ],
})
export class WildflowersPageModule {}
