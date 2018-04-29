//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the WildflowersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WildflowersProvider {


  basePath: string = '/wildflowers';
  flowers: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    console.log('Hello WildflowersProvider Provider');

    this.flowers=db.list(this.basePath).valueChanges();

  }

  get(): Observable<any[]> {
    return this.flowers;
  }

  // constructor(public http: HttpClient) {
  //   console.log('Hello WildflowersProvider Provider');
  // }

}
