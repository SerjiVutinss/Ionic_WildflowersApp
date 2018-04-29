import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

// Storage
import { IonicStorageModule } from '@ionic/storage';

// Firebase + AngularFire
import { AngularFireModule, } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
// Private Firebase configuration settings 
//    - must be manually created, note in README.MD
import { firebaseConfig } from '../firebase-config';
// Custom AngularFire Authentication Provider
import { AfAuthProvider } from '../providers/af-auth/af-auth';
// AngularFire Database Module and Provider
import { AngularFireDatabaseModule, AngularFireDatabase } from "angularfire2/database";
// Custom Providers for AngularFire/Firebase data
import { WildflowersProvider, WildflowerImagesProvider } from '../providers/wildflowers';
import { WildflowerCardPage } from '../pages/wildflower-card/wildflower-card';
import { WildflowerDetailPage } from '../pages/wildflower-detail/wildflower-detail';
import { WildflowersPage } from '../pages/wildflowers/wildflowers';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    WildflowersPage,
    WildflowerCardPage,
    WildflowerDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot({
      name: '__app.db',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    WildflowersPage,
    WildflowerCardPage,
    WildflowerDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireAuth,
    AfAuthProvider,
    WildflowersProvider,
    WildflowerImagesProvider
  ]
})
export class AppModule { }
