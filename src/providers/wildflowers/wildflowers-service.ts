import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';

/**
*  Provider to handle retrieving wildflower data from Firebase
* 
*  Uses https://github.com/angular/angularfire2 library to retrieve data from Firebase
*/
@Injectable()
export class WildflowersProvider {


  private basePath: string = '/wildflowers';
  private flowers: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    console.log('Hello WildflowersProvider Provider');

    // data only retrieved once
    this.flowers = db.list(this.basePath).valueChanges();

  }

  /**
  * Function to return all wildflower data from Firebase
  * which populates the main list or card view
  * 
  * @returns an Observable<any> of all records at the Firebase path (basePath)
  */
  getAll(): Observable<any[]> {
    // do not hit the database again, simply return Observable array
    return this.flowers;
  }

  // unused, included for completeness
  get($key: string): Observable<any> {
    return this.db.object(this.basePath + "/" + $key).valueChanges();
  }

}
