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
    this.wildflowers = this.db.list(this.basePath, ref => ref.limitToFirst(10)).snapshotChanges();
  }

}
