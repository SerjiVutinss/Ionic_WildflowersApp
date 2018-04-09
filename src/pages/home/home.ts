import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AfAuthProvider } from '../../providers/af-auth/af-auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // injecting AlertController and AngularFireAuth provider
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private afAuthService: AfAuthProvider
  ) { }

  // sign out the current user and navigate to the login page
  login() {
    this.afAuthService.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  // sign out the current user and reload the home page
  logout() {
    this.afAuthService.signOut();
    this.navCtrl.setRoot(HomePage);
  }

  // used for testing if a user is authenticated
  // TODO: wil be expanded upon and reused later
  openUserPage() {
    if (this.isAuthenticated()) {
      // only navigate here if a user is logged in
      this.navCtrl.push("UserPage");
    } else {
      // otherwise, display an alert
      let alert = this.alertCtrl.create({
        title: 'Access denied!',
        subTitle: 'You must be logged in!',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  openTestPage() {
    //if (this.isAuthenticated()) {
      // only navigate here if a user is logged in
      this.navCtrl.push("TestPage");
    // } else {
    //   // otherwise, display an alert
    //   let alert = this.alertCtrl.create({
    //     title: 'Access denied!',
    //     subTitle: 'You must be logged in!',
    //     buttons: ['OK']
    //   });
    //   alert.present();
    // }
  }

  // return true if a user is logged in
  isAuthenticated(): boolean {
    return this.afAuthService.authenticated;
  }

}
