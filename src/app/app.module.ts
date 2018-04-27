import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ReservationsPage } from '../pages/reservations/reservations';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './fbCredentials';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { GeoServiceProvider } from '../providers/geo-service/geo-service';
import { RestModalPage } from '../pages/rest-modal/rest-modal';
import { BookingModalPage } from '../pages/booking-modal/booking-modal';



@NgModule({
  declarations: [
    
    MyApp,
    ReservationsPage,
    SettingsPage,
    AboutPage,
    ContactPage,
    HomePage,
    RestModalPage,
    BookingModalPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ReservationsPage,
    SettingsPage,
    AboutPage,
    ContactPage,
    HomePage,
    RestModalPage,
    BookingModalPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    GeoServiceProvider
  ]
})
export class AppModule {}
