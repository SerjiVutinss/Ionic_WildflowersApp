import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, InfiniteScroll, PopoverController } from 'ionic-angular';
import { WildflowersProvider } from '../../../providers/wildflowers';
import { Wildflower } from '../models';
import { WildflowerFilterPage } from '../wildflower-filter/wildflower-filter';
import { WildflowerSortFilterProvider } from '../../../providers/wildflowers/wildflower-sort-service';
import { Storage } from '@ionic/storage';
import { User } from '../../../models';
import { AfAuthProvider } from '../../../providers/af-auth/af-auth';

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

  // This is the number of items which are loaded each time the infinite scroll 
  // handler is triggered.  The value of this variable is never changed and so is
  // declared as readonly.
  private readonly defaultLimit = 12;

  // The number of items to load on infinite scroll event - doInfinite()
  // Inital value is set to defaultLimit and is incremented on each infinite scroll event
  private numItems: number = this.defaultLimit;

  // All of the returned firebase records
  // Once it is assigned in the page constructor, its contents never change
  private allWildflowers: Wildflower[];

  // This array will contain the filtered or sorted records
  private wildflowers: Wildflower[];

  // A 2D array - this is assigned through the WildflowerSortFilterProvider
  // It is the view array and determines how each object is displayed in the template grid
  private gridMatrix: Array<Wildflower[]>;

  // Maximum number of elements per grid row, this is passed into the 
  // WildflowerSortFilterProvider functions
  private gridWidth: number = 1;


  // The string variable used by the search bar
  private qryString: string;

  private filterOn: boolean = false;

  private isListView: boolean = false;

  private user: User;

  constructor(
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private wildflowerService: WildflowersProvider,
    private wildflowerSortFilterService: WildflowerSortFilterProvider,
    private storage: Storage,
    private afAuth: AfAuthProvider
  ) {
    //this.setUserPrefs();
    // Assign all returned firebase results to the allWildflowers array
    this.wildflowerService.getAll().subscribe(
      wildflowers => {
        this.allWildflowers = wildflowers,
          null,
          // finally assign the results to the class array
          this.wildflowers = this.allWildflowers;
          this.getUserDetails();
      });
  }

  setUserPrefs() {
    console.log(this.user);
    this.isListView = !!this.user.listView;
  }

  getUserDetails() {
    this.user = new User();
    this.user.email = this.afAuth.getEmail();

    this.storage.get
      (this.user.email)
      .then((data) => {
        if (data == null) {
          console.log("User has no settings");
          this.user.listView = false;
        } else {
          this.user.username = data.username;
          this.user.listView = (data.listView == 'true');
          this.user.sortType = data.sortType;
          this.isListView = !!this.user.listView;
          this.sortByCommonName();
          this.setupGrid();
        }
      })
      .catch((err) => {
        console.log("Error = " + err);
      })
  }

  toggleCardView() {
    this.isListView = !this.isListView;
  }

  gotoDetail(flower: Wildflower) {
    this.navCtrl.push("WildflowerDetailPage", {
      wildflower: flower
    });
  }

  openFilter() {
    this.filterOn = !this.filterOn;
  }

  setupGrid() {
    this.gridMatrix = this.wildflowerSortFilterService.setupGridArray(
      this.wildflowers, this.numItems, this.gridWidth
    );
  }

  filterWildflowers() {
    this.wildflowers = this.allWildflowers.filter(flower =>
      flower.commonName.toLowerCase().indexOf(this.qryString.toLowerCase()) >= 0
    );

    if (this.wildflowers.length < this.allWildflowers.length) {
      this.filterOn = true;
    } else {
      this.filterOn = false;
    }

    this.setupGrid();
  }

  onInput() {
    this.filterWildflowers();
  }

  clearFilter() {
    this.qryString = "";
    this.filterOn = false;
    this.wildflowers = this.allWildflowers;
    this.setupGrid();
  }

  openPopover(event): void {
    let popover = this.popoverCtrl.create(WildflowerFilterPage);

    let ev = {
      target: {
        getBoundingClientRect: () => {
          return {
            top: '250'
          };
        }
      }
    }

    popover.present({ ev });

    popover.onDidDismiss(qryString => {

      if (qryString != null) {
        this.qryString = qryString;
        this.filterWildflowers();
      }
    });

  }

  openSortMenu(): void {
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

  /**
  * doInfinite() - this function is the handler for the infinite scroll element
  * @param event This is the event parameter, it is passed in from the the template
  * 
  *  Notes: The function uses class variables which are used to load more items
  *   
  */
  doInfinite(event: any): void {
    // Only re-calculate the grid matrix if needed, e.g. the wildflowers array may be 
    // filtered and contain less than numItems, or all items may already have loaded
    if (this.numItems < this.wildflowers.length) {
      this.numItems += this.defaultLimit; // load defaultLimit more items this time
      console.log(this.numItems);
      // call the service method to return and assign the grid matrix
      this.gridMatrix = this.wildflowerSortFilterService.setupGridArray(
        this.wildflowers,
        this.numItems,
        this.gridWidth
      );
    }
    // this will notify the infinite scroll element that loading has completed,
    // and the loading spinner should be removed
    event.complete();
  }

  /**
  * sortByCommonName() - sort the grid matrix by each wildflower's commonName attribute
  * @param desc - optional parameter, if true, grid matric will be sorted in reverse order 
  *   Note: This function resets any filters applied to the matrix
  */
  sortByCommonName(desc?: boolean): void {
    this.numItems = this.defaultLimit; // reset the numItems to the default amount
    // call the service method which returns the sorted matrix
    this.gridMatrix = this.wildflowerSortFilterService.sortByCommonName(
      this.wildflowers, this.numItems, this.gridWidth, desc
    )
  }

  /**
  * sortByScientificName() - sort the grid matrix by each wildflower's scientificName attribute
  * @param desc - optional parameter, if true, grid matric will be sorted in reverse order 
  *   Note: This function resets any filters applied to the matrix
  */
  sortByScientificName(desc?: boolean): void {
    this.numItems = this.defaultLimit; // reset the numItems to the default amount
    // call the service method which returns the sorted matrix
    this.gridMatrix = this.wildflowerSortFilterService.sortByScientificName(
      this.wildflowers, this.numItems, this.gridWidth, desc
    )
  }
}
