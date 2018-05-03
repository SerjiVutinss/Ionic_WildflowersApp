import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WildflowerImagesProvider } from '../../../providers/wildflowers';
import { Wildflower, WildflowerImage } from '../models';

import { BrowserTab } from '@ionic-native/browser-tab';

/**
 * Generated class for the WildflowerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wildflower-detail',
  templateUrl: 'wildflower-detail.html',
})
export class WildflowerDetailPage {

  private wildflower: Wildflower;
  private wildflowerImages: WildflowerImage[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wildflowerImageService: WildflowerImagesProvider,
    private browserTab: BrowserTab
  ) {
    this.wildflower = this.navParams.get('wildflower');
  }

  ngOnInit() {
    this.wildflowerImageService.get(this.wildflower.scientificName).subscribe(
      images => {
        this.wildflowerImages = images
      }
    );
  }

  ionViewDidLoad() {
  }

  viewInBrowser(wildflowerImage: WildflowerImage) {
    this.browserTab.isAvailable().then(
      (isAvailable: boolean) => {
        if(isAvailable) {
          this.browserTab.openUrl(wildflowerImage.img_link);
        } else {
          // TODO
        }
      }
    ).catch(err => {
      console.log(err);
    });
  }

}
