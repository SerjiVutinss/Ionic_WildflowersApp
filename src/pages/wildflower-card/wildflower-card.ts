import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WildflowerImage, Wildflower } from '../../models';

/**
 * Generated class for the WildflowerCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wildflower-card',
  templateUrl: 'wildflower-card.html',
})
export class WildflowerCardPage {

  @Input()
  wildflower: Wildflower;

  private wildflowerImages: WildflowerImage[];
  private defaultImage: WildflowerImage;

  private popoverIsActive: boolean;


  constructor(
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WildflowerCardPage');
  }

  gotoDetail(flower: Wildflower) {
    //this.navCtrl.push(['/flower', flower.$key]);
  }

  onPopoverShown() {
    this.popoverIsActive = true;
  }
  onPopoverHidden() {
    this.popoverIsActive = false;
  }

}
