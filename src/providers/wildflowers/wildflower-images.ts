import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the WildflowerImagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WildflowerImagesProvider {

  private basePath: string = "/wildflower-images";
  wildflowers: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase
  ) {
    console.log("Hello IMAGE PROVIDER");
    //this.wildflowers = this.db.list(this.basePath, ref => ref.limitToFirst(10)).snapshotChanges();
  }

  // unused, included for completeness
  getAll(): Observable<any> {
    return this.db.list(this.basePath,
      ref => ref.orderByChild('flower_name')).valueChanges();
  }

  get(scientificName: string): Observable<any[]> {
    return this.db.list(this.basePath, ref =>
      ref.orderByChild('flower_name').equalTo(scientificName)).valueChanges();
  }
}
