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
 * This page displays either a list or grid of wildflower objects,
 * depending on classs variables (which can be based on user preferences)
 *
 */

// TODO: maybe implement this enum for sort type?
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
  private gridWidth: number = 3;


  // The string variable used by the search bar
  private qryString: string;

  // true if a filter has been applied
  private filterOn: boolean = false;

  // defaults to false, determines which view to display
  private isListView: boolean = false;

  // user bound to this page, this object is built in getUserDetails()
  private user: User;

  constructor(
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private wildflowerService: WildflowersProvider, // used to retrieve Firebase records
    private wildflowerSortFilterService: WildflowerSortFilterProvider, // used for sorting methods
    private storage: Storage, // needed to retrieve user preferences
    private afAuth: AfAuthProvider // needed to get the logged in user's email
  ) {

    // Assign all returned firebase results to the allWildflowers array
    this.wildflowerService.getAll().subscribe(
      wildflowers => {
        this.allWildflowers = wildflowers,
          null, // TODO: handle error
          // finally assign the results to the class array
          this.wildflowers = this.allWildflowers;
        // if a user is logged in, try to get preferences from Storage
        if (this.afAuth.authenticated) {
          this.getUserDetails();
        } else {
          // all details retrieved, now sort the item array,
          // defaulting sort to Common Name ascending
          this.sortByCommonName();
          // and build the gridMatrix
          this.setupGrid();
        }
      });
  }


  // Begin Section: Initialisation

  /**
  * This function handles getting the currently logged in user's details from Storage,
  * it is only called if a user is actually logged in - i.e. afAuth.authenticated=true
  * 
  * Notes: Sets the default view type according to user setting - defaults to CardView
  */
  getUserDetails() {
    // create a new User object
    this.user = new User(this.afAuth.getEmail());
    // set the User object's email attribute to the logged in Firebase user's email

    // asynchrously get the User's data from Storage if it exists
    this.storage.get
      (this.user.email)
      .then((data) => {
        if (data == null) {
          console.log("User has no settings - defaulting to Card View");
          this.user.listView = false;
        } else {
          // user setting were found - retrieve the values
          this.user.username = data.username;
          this.user.listView = (data.listView == 'true');
          this.user.sortType = data.sortType;

          // set this clas variable to the user's preference
          this.isListView = !!this.user.listView;

          // all details retrieved, now sort the item array,
          // defaulting sort to Common Name ascending
          this.sortByCommonName();
          // and build the gridMatrix
          this.setupGrid();
        }
      })
      .catch((err) => {
        console.log("Error = " + err);
      })
  }
  // End Section


  // Begin Section: Event Handlers

  /**
  * This function handles switching between Card and List views
  * 
  * Notes: Attached to an icon button at the top of the list, it toggles the boolean class 
  * variable isListView
  */
  toggleCardView() {
    this.isListView = !this.isListView;
  }

  /**
  * This function handles lazy loading the WildFlowerDetailPage
  * @param wildflower - passed as a parameter to the navCtrl.push() method
  * 
  * Notes: Attached to each instance of WildflowerCard or List item depending on which
  * view is selected.  Passes the selected Wildflower object into the detail page
  */
  gotoDetail(wildflower: Wildflower) {
    this.navCtrl.push("WildflowerDetailPage", {
      wildflower: wildflower
    });
  }

  /**
  * This function is the handler for the infinite scroll element
  * @param event This is the event parameter, it is passed in from the the template
  * 
  *  Notes: The function uses class variables which are used to load more items
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
  * This function opens the filter menu Popover
  * 
  * Notes: if the text filed on the Popover contains a value, the item
  * array is filtered and the gridMatrix is setup in the onDidDismiss() event
  */
  openPopover(event): void {
    // create the popover instance using the WildflowerFilterPage
    let popover = this.popoverCtrl.create(WildflowerFilterPage);

    // position the popover on the screen
    let ev = {
      target: {
        getBoundingClientRect: () => {
          return {
            top: '250'
          };
        }
      }
    }
    // show the popover
    popover.present({ ev });

    // handler for when the popover is dimsissed/closed
    popover.onDidDismiss(qryString => {
      // check to see if there is a value in the popover's text field
      if (qryString != null) {
        // assign the text field to the qryString variable
        this.qryString = qryString;
        // filter the array, and subsequently setup the gridMatrix
        this.filterWildflowers();
      }
    });
  }
  //// End Section

  //// Begin Section: Array sorting, filtering and grid setup

  /**
  * This function sets up the grisMatrix class variable used to display items 
  * in an ordered way
  * 
  * Notes: calls the setupGridArray() method in the WildflowerSortProvider
  */
  setupGrid() {
    this.gridMatrix = this.wildflowerSortFilterService.setupGridArray(
      this.wildflowers, this.numItems, this.gridWidth
    );
  }

  /**
  * This function filters the item array and sets up the grid
  * 
  * Notes: if the text filed on the Popover contains a value, the item
  * array is filtered and the gridMatrix is setup in the onDidDismiss() event
  */
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

  /**
 * This function clears any filter applied to the item array
 * 
 * Notes: fills array with all of the Firebase records and then sets up the gridMatrix
 */
  clearFilter() {
    this.qryString = "";
    this.filterOn = false;
    this.wildflowers = this.allWildflowers;
    this.setupGrid();
  }

  /**
  * This function opens the sort menu Action Sheet
  * 
  * Notes: calls one of the sort functions on this page,
  * this is fairly self-explanatory
  */
  openSortMenu(): void {
    let actionSheet = this.actionSheetCtrl.create({
      // set totle and buttons
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
    // show the Action Sheet
    actionSheet.present();
  }

  /**
  * This function sorts the grid matrix by each wildflower's commonName attribute
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
  * This function sorts the grid matrix by each wildflower's scientificName attribute
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

  //// End Section

  //// Begin Section: Graveyard

  // setUserPrefs() {
  //   this.isListView = !!this.user.listView;
  // }



  // openFilter() {
  //   this.filterOn = !this.filterOn;
  // }

  // onInput() {
  //   this.filterWildflowers();
  // }

  //// End Section
}
