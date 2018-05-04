import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { AfAuthProvider } from '../../providers/af-auth/af-auth';

import { HomePage } from './../home/home';
//import { SignupPage } from '../signup/signup'; // disabled for submission

/**
* The login page for the application - used to sign in users via firebase
*
*/
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // FormGroup used by the FormBuilder
  loginForm: FormGroup;
  loginError: string;

  constructor(
    private navCtrl: NavController,
    private afAuthService: AfAuthProvider,
    formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  /**
  * This function attempts to log in the user using the form credentials
  *
  */
  login() {
    // get the form data
    let data = this.loginForm.value;

    // if the email field is null, simply return
    if (!data.email) {
      return;
    }

    // set the credentials which are to be passed into authService.signInWithEmail()
    let credentials = {
      email: data.email,
      password: data.password
    };
    // call the sign in method
    this.afAuthService.signInWithEmail(credentials)
      .then(
        () => this.navCtrl.setRoot(HomePage),
        error => this.loginError = error.message
      );
  }

  signup() {
    //this.navCtrl.push(SignupPage);
  }

}
