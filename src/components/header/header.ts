import { Component } from "@angular/core";
import { AfAuthProvider } from "../../providers/af-auth/af-auth";
import { NavController, AlertController, IonicPage } from "ionic-angular";

import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';


@IonicPage()
@Component({
    selector: 'header-component',
    templateUrl: './header.html'
})

export class HeaderComponent {

    constructor(
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private afAuthService: AfAuthProvider
    ) { }

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
