import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AfAuthProvider } from '../../providers/af-auth/af-auth';

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

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private afAuthService: AfAuthProvider
  ) { }

  ionViewCanEnter() {
    return this.afAuthService.authenticated;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

}
