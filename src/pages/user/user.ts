import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AfAuthProvider } from '../../providers/af-auth/af-auth';
import { Storage } from '@ionic/storage';

import { User } from '../../models';


/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  private user: User;

  // workaround because getting undefined for user.username
  private username: string;

  constructor(
    private afAuthService: AfAuthProvider,
    private storage: Storage
  ) {
    this.user = new User();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
    this.user.email = this.afAuthService.getEmail();
    this.getUserDetails();
    if(this.user.sortType ==null){
      this.user.sortType="commonAsc"
    }
  }

  getUserDetails() {
    this.storage.get
      (this.user.email)
      .then((data) => {
        if (data == null) {
          console.log("User has no settings");
          this.user.listView = false;
        } else {
          this.user.username = data.username;
          this.user.listView = (data.listView == 'true');
          this.user.sortType = data.sortType
        }
      })
      .catch((err) => {
        console.log("Error = " + err);
      })
  }

  updateUserDetails() {
    this.storage.set(this.user.email, {
      'username': this.user.username,
      'listView': this.user.listView,
      'sortType': this.user.sortType
    });
  }

}