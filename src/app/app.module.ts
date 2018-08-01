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
//import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './fbCredentials';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { GeoServiceProvider } from '../providers/geo-service/geo-service';
import { RestModalPage } from '../pages/rest-modal/rest-modal';
import { FilterModalPage } from '../pages/filter-modal/filter-modal';

import { LoginPage } from '../pages/login/login';
import { LoginModalPage } from '../pages/login-modal/login-modal';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { Geolocation } from '@ionic-native/geolocation';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterPage } from '../pages/register/register';
import { LoginRegisterProvider } from '../providers/login-register/login-register';
import {HttpClientModule} from '@angular/common/http';
import { PersonalDetailsPage } from '../pages/personal-details/personal-details';
import { BookingConfirmationPage } from '../pages/booking-confirmation/booking-confirmation';

@NgModule({
  declarations: [
    MyApp,
    ReservationsPage,
    SettingsPage,
    AboutPage,
    ContactPage,
    HomePage,
    RestModalPage,
    BookingConfirmationPage,
    FilterModalPage,
    TabsPage,
    LoginPage,
    LoginModalPage,
    RegisterPage,
    PersonalDetailsPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyD9WttyqFcI5wTLvoL16i1Kri_Vzg7kINE',
      libraries: ["places"]
      
    }),
    AgmSnazzyInfoWindowModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    //AngularFireStorageModule, // imports firebase/storage only needed for storage features
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
    BookingConfirmationPage,
    FilterModalPage,
    TabsPage,
    LoginPage,
    LoginModalPage,
    RegisterPage,
    PersonalDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    GeoServiceProvider,
    Geolocation,
    LoginRegisterProvider   
  ],  
})
export class AppModule {}
