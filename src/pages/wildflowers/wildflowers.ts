import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WildflowersProvider } from '../../providers/wildflowers';
import { Wildflower } from '../../models';

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
  templateUrl: 'wildflowers.html',
})
export class WildflowersPage {


  private wildflowers: Wildflower[];

  private grid: Array<Wildflower[]>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
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

  setupGridArray() {

    let size: number = 3;

    this.grid = Array(Math.ceil(this.wildflowers.length / size));

    let n = 0;
    let rowNum = 0;
    for (let i = 0; i < this.wildflowers.length; i += size) {
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

  sortByCommonName(desc?: boolean) {
    this.wildflowers.sort(
      (a, b) => a.commonName.localeCompare(b.commonName)
    );
  }
  sortByScientificName(desc?: boolean) {
    this.wildflowers.sort(
      (a, b) => a.scientificName.localeCompare(b.scientificName)
    );
  }

}
