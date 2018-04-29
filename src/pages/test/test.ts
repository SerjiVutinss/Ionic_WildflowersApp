import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { WildflowersProvider } from '../../providers/wildflowers/wildflowers';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  names: string[] = [];

  name: string;

  flowers: any[];


  constructor(
    private storage: Storage,
    private wildflowerService: WildflowersProvider
  ) {

    this.wildflowerService.get().subscribe(flowers => {
      this.flowers = flowers,
      null
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
    this.refresh();
  }

  saveData() {
    this.storage.set("name", this.name);
    this.refresh();
  }

  refresh() {
    this.storage.get
      ("name")
      .then((data) => {
        if (data == null) {
          console.log("name not in storage");
        } else {
          this.names.push(data);
          console.log("name = " + data);
        }
      })
      .catch((err) => {
        console.log("Error = " + err);
      })
  }

}
