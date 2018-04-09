import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/*
  Generated class for the AfAuthProvider provider.

  Handles Firebase Authentication, including sign in and sign out

  My code has been adapted from following tutorial and git repo:
  https://medium.com/appseed-io/integrating-firebase-password-and-google-authentication-into-your-ionic-3-app-2421cee32db9
  https://github.com/appseed-io/ionic3-firebase-auth

*/
@Injectable()
export class AfAuthProvider {

  // import the Firebase User interface
  private user: firebase.User;

  // inject the AngularFireAuth class
  constructor(private afAuth: AngularFireAuth) {
    // set up the user
    afAuth.authState.subscribe(user=> {
      this.user = user;
    })
  }

  // returns true if user is authenticated
  get authenticated(): boolean {
		return this.user !== null;
	}

  // return the current user object and email
	getEmail() {
		return this.user && this.user.email;
	}

  // sign in method
	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			credentials.password);
	}

  // sign up new user method
	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}

  // sign out method
	signOut(): Promise<void> {
		return this.afAuth.auth.signOut();
	}

}
