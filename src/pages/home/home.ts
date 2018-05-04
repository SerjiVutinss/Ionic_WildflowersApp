import { Component } from '@angular/core';
import { NavController, AlertController, MenuController } from 'ionic-angular';
import { AfAuthProvider } from '../../providers/af-auth/af-auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // injecting AlertController, Menu Controller and AngularFireAuth provider
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private afAuthService: AfAuthProvider,
    private menu: MenuController
  ) {
    menu.enable(true);
  }

  // sign out the current user and navigate to the login page
  login() {
    this.afAuthService.signOut();
    //this.navCtrl.setRoot(LoginPage);
    this.navCtrl.push(LoginPage);
  }

  // show/hide the menu
  toggleMenu() {
    this.menu.toggle;
  }

  // sign out the current user
  logout() {
    this.afAuthService.signOut();

    //// I have disabled this due to an issue with the menu
    //this.navCtrl.setRoot(HomePage);
  }

  // used for testing if a user is authenticated
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

  openWildflowersPage() {
    this.navCtrl.push("WildflowersPage");
  }

  // page used for testing and debugging features
  openTestPage() {
    this.navCtrl.push("TestPage");
  }

  // return true if a user is logged in
  isAuthenticated(): boolean {
    return this.afAuthService.authenticated;
  }

}
