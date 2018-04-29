//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import { Wildflower } from '../../models';

/*
  Generated class for the WildflowersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WildflowersProvider {


  basePath: string = '/wildflowers';
  flowers: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    console.log('Hello WildflowersProvider Provider');

    this.flowers = db.list(this.basePath).valueChanges();

  }

  getAll(): Observable<any[]> {
    return this.flowers;
  }

  get($key: string): Observable<any> {
    return this.db.object(this.basePath + "/" + $key).valueChanges();
  }

}
