import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AfAuthProvider } from '../../providers/af-auth/af-auth';

// FormBuilder
//import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Storage } from '@ionic/storage';
import { User } from '../../models/User';

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

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private afAuthService: AfAuthProvider,
    private storage: Storage
  ) {
    this.user = new User();
  }

  // a user must be logged in to access this page!
  ionViewCanEnter() {
    return this.afAuthService.authenticated;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
    this.user.email = this.afAuthService.getEmail();
    this.getUserDetails();
  }

  getUserDetails() {
    this.storage.get
      (this.user.email)
      .then((data) => {
        if (data == null) {
          console.log("User has no settings");
        } else {
          this.user.username = data.username;
        }
      })
      .catch((err) => {
        console.log("Error = " + err);
      })
  }

  updateUserDetails() {
    this.storage.set(this.user.email, { "username": this.user.username });
  }

}