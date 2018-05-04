import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
*  Provider to handle retrieving image data from Firebase for wildflowers
* 
*  Uses https://github.com/angular/angularfire2 library to retrieve data from Firebase
*/
@Injectable()
export class WildflowerImagesProvider {

  // path used by firebase
  private basePath: string = "/wildflower-images";

  constructor(
    private db: AngularFireDatabase
  ) {
    console.log("Hello IMAGE PROVIDER");
  }

  /**
  * Function to return all image data from Firebase - unused in the application,
  * included for completeness
  * 
  * @returns an Observable<any> of all records at the Firebase path (basePath)
  */
  getAll(): Observable<any> {
    return this.db.list(this.basePath,
      ref => ref.orderByChild('flower_name')).valueChanges();
  }

  /**
  * Function to return image data related to Wildflower with supplied scientifcName
  * 
  * @returns an Observable<any> of all records  related to the supplied wildflower 
  * name as an observable
  */
  get(scientificName: string): Observable<any[]> {
    return this.db.list(this.basePath, ref =>
      ref.orderByChild('flower_name').equalTo(scientificName)).valueChanges();
  }
}
