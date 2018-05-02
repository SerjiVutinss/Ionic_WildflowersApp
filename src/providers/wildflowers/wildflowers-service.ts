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


  private basePath: string = '/wildflowers';
  private flowers: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    console.log('Hello WildflowersProvider Provider');

    this.flowers = db.list(this.basePath).valueChanges();

  }

  getAll(): Observable<any[]> {
    return this.flowers;
  }

  // unused, included for completeness
  get($key: string): Observable<any> {
    return this.db.object(this.basePath + "/" + $key).valueChanges();
  }

}
