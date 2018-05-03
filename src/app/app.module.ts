import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';


import { BrowserTab } from '@ionic-native/browser-tab';

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
import { WildflowersProvider, WildflowerImagesProvider, WildflowerSortFilterProvider } from '../providers/wildflowers';

//import { HeaderComponent } from '../components/header/header';

// Wildflower pages
//import { WildflowersPage, WildflowerCardPage, WildflowerDetailPage } from '../pages/wildflower-pages';
import { WildflowersPageModule } from '../pages/wildflower-pages/wildflowers/wildflowers.module';
import { WildflowerDetailPageModule } from '../pages/wildflower-pages/wildflower-detail/wildflower-detail.module';

import { HeaderModule} from '../components/header/header.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot({
      name: '__app.db',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    WildflowersPageModule,
    WildflowerDetailPageModule,
    HeaderModule
  ],
  exports: [
    HeaderModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireAuth,
    AfAuthProvider,
    WildflowersProvider,
    WildflowerImagesProvider,
    WildflowerSortFilterProvider,
    BrowserTab
  ]
})
export class AppModule { 
}
