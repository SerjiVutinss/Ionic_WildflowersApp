import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, InfiniteScroll } from 'ionic-angular';
import { WildflowersProvider } from '../../../providers/wildflowers';
import { Wildflower } from '../models';

//import { ThumbnailPipe } from '../../pipes/thumbnail/thumbnail';

/**
 * Generated class for the WildflowersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// enum SortType {
//   CommonNameAsc,
//   CommonNameDesc,
//   ScientificNameAsc,
//   ScientificNameDesc
// }

@IonicPage()
@Component({
  selector: 'page-wildflowers',
  templateUrl: 'wildflowers.html'
})
export class WildflowersPage {

  private defaultLimit = 12;

  private wildflowers: Wildflower[];

  private grid: Array<Wildflower[]>;

  private limit: number = 12;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private wildflowerService: WildflowersProvider
  ) {

    this.wildflowerService.getAll().subscribe(
      wildflowers => {
        this.wildflowers = wildflowers,
          null,
          this.setupGridArray()
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WildflowersPage');
  }

  openMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Sort Wildflowers',
      buttons: [
        {
          text: 'Common Name (asc)',
          handler: () => {
            this.sortByCommonName();
          }
        },
        {
          text: 'Common Name (desc)',
          handler: () => {
            this.sortByCommonName(true);
          }
        },
        {
          text: 'Scientific Name (asc)',
          handler: () => {
            this.sortByScientificName();
          }
        },
        {
          text: 'Scientific Name (desc)',
          handler: () => {
            this.sortByScientificName(true);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  setupGridArray() {

    let size: number = 4;

    this.grid = Array(Math.ceil(this.limit / size));

    let n = 0;
    let rowNum = 0;
    for (let i = 0; i < this.limit; i += size) {
      this.grid[rowNum] = Array<Wildflower>(size);

      n = i;
      for (let j = 0; j < size; j++) {
        if (this.wildflowers[n] != null) {
          this.grid[rowNum][j] = this.wildflowers[n];
        }
        n++;
      }
      rowNum++;
    }
  }

  doInfinite(event: any) {

    if (this.limit < this.wildflowers.length) {
      this.limit += this.limit;
      this.setupGridArray();
      event.complete();
    }
  }

  sortByCommonName(desc?: boolean) {
    this.limit = this.defaultLimit;
    if (!desc) {
      this.wildflowers.sort(
        (a, b) => a.commonName.localeCompare(b.commonName)
      );
    } else {
      this.wildflowers.sort(
        (a, b) => b.commonName.localeCompare(a.commonName)
      );
    }
    this.setupGridArray();
  }
  sortByScientificName(desc?: boolean) {
    this.limit = this.defaultLimit;
    if (!desc) {
      this.wildflowers.sort(
        (a, b) => a.scientificName.localeCompare(b.scientificName)
      );
    } else {
      this.wildflowers.sort(
        (a, b) => b.scientificName.localeCompare(a.scientificName)
      );
    }
    this.setupGridArray();
  }

}
