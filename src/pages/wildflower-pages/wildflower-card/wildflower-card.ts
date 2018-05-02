import { Component, Input, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WildflowerImage, Wildflower } from '../models';
import { WildflowerImagesProvider } from '../../../providers/wildflowers';

/**
 * Generated class for the WildflowerCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
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
    private navParams: NavParams,
    private wildflowerImageService: WildflowerImagesProvider
  ) {
  }

  ngOnInit() {
    this.wildflowerImageService.get(this.wildflower.scientificName)
      .subscribe(images => {
        this.wildflowerImages = images,
          null,
          this.defaultImage = this.wildflowerImages[0]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WildflowerCardPage');
  }

  gotoDetail(flower: Wildflower) {
    this.navCtrl.push("WildflowerDetailPage", {
      wildflower: flower
    });
  }

  onPopoverShown() {
    this.popoverIsActive = true;
  }
  onPopoverHidden() {
    this.popoverIsActive = false;
  }

}
