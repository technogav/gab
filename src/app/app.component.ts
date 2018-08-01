import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { LoginRegisterProvider } from '../providers/login-register/login-register';
import { ContactPage } from '../pages/contact/contact';
import { SettingsPage } from '../pages/settings/settings';
import { FilterModalPage } from '../pages/filter-modal/filter-modal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  @ViewChild(Nav) nav: Nav;

  //pages:Array<any>;

  pageys = [{},{},{}];
  pages: Array<any>;
  loggedIn: boolean;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private loginRegisterService: LoginRegisterProvider,
    public alertCtrl : AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
    });
    this.checkIfLoggedIn();
    
  }

  private checkIfLoggedIn(){
    if(this.loginRegisterService.getUser()){
      this.loggedIn = true;
      this.pages = [
        { title: 'Profile', component: ContactPage },
        { title: 'Settings', component: SettingsPage },
        { title: 'Filter', component: FilterModalPage }
      ]
    }else{
      this.loggedIn = false;
      this.pages = [
        { title: 'Settings', component: SettingsPage },
        { title: 'Filter', component: FilterModalPage },
        { title: 'Login', component: LoginPage }
      ]
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);

    let alert = this.alertCtrl.create({
			title: 'Alert',
			subTitle: 'Side menu is not configured yet',
			buttons: ['Dismiss']
		  });

		  alert.present();

  }

  logout(){
    this.loginRegisterService.logout()
      .then((res)=>{

        let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'You are now logged out.',
          buttons: ['Dismiss']
          });
    
          alert.present();
        
        this.loginRegisterService._user = null;
      })
  }
}
