import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
* Handles Firebase Authentication, including sign in and sign out.
*
*
* This code has been adapted from following tutorial and git repo, with significant changes:
*  - https://medium.com/appseed-io/integrating-firebase-password-and-google-authentication-into-your-ionic-3-app-2421cee32db9
*  - https://github.com/appseed-io/ionic3-firebase-auth
*/
@Injectable()
export class AfAuthProvider {

  // import the Firebase User interface
  private user: firebase.User;

  // inject the AngularFireAuth class
  constructor(private afAuth: AngularFireAuth) {
    // set up the user
    afAuth.authState.subscribe(user => {
      this.user = user;
    })
  }

  /**
  * This function returns true if user is authenticated
  *
  * @returns boolean, true if user is authenticated via firebase
  */
  get authenticated(): boolean {
    return this.user !== null;
  }

  /**
  * This function return the current user object and email
  *
  * @returns return the current user object and email
  */
  getEmail() {
    return this.user && this.user.email;
  }

  /**
  * This function tries to sign in via firebase authentication
  *
  * @returns return a promise, used in login.ts
  */
  signInWithEmail(credentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
      credentials.password);
  }

  /**
   * This function signs out the current user via firebase authentication
   *
   * @returns return a promise, used in home.ts
   */
  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  // // sign up new user method - functionality disabled currently
  // signUp(credentials) {
  // 	return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  // }


}
