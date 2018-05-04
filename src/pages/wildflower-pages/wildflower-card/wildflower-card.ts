import { Component, Input, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WildflowerImage, Wildflower } from '../models';
import { WildflowerImagesProvider } from '../../../providers/wildflowers';

/**
 * Displays a single Wildflower object in a card format which also displays the default image
 */

//@IonicPage() // not a page - just a component
@Component({
  selector: 'page-wildflower-card',
  templateUrl: 'wildflower-card.html',
})
export class WildflowerCardPage {

  @Input()
  wildflower: Wildflower; // passed in from wildflowers.html via attribute directive

  private wildflowerImages: WildflowerImage[]; // all images related to this wildflower instance
  private defaultImage: WildflowerImage; // the first image in the wildflowerImages array, the image shown on each card

  //private popoverIsActive: boolean; // 


  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private wildflowerImageService: WildflowerImagesProvider
  ) {
  }

  ngOnInit() {
    // get the image links for this wildflower via Firebase
    this.wildflowerImageService.get(this.wildflower.scientificName)
      .subscribe(images => {
        this.wildflowerImages = images, // assign the images
          null,
          this.defaultImage = this.wildflowerImages[0] // and assign the default image
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WildflowerCardPage');
  }

  /**
  * Opens the WildflowerDetailPage with the wildflower object
  * @param flower the wildflower object which is passed to the detail page as a parameter
  *
  */
  gotoDetail(flower: Wildflower) {
    this.navCtrl.push("WildflowerDetailPage", {
      wildflower: flower
    });
  }

  // onPopoverShown() {
  //   this.popoverIsActive = true;
  // }
  // onPopoverHidden() {
  //   this.popoverIsActive = false;
  // }

}
