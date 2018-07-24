import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { LoginRegisterProvider } from '../../providers/login-register/login-register';
import { LoginPage } from '../login/login';
/* import { LoginModalPage } from '../login-modal/login-modal'; */


@Component({
  selector: 'page-reservations',
  templateUrl: 'reservations.html'
})

export class ReservationsPage {
  
  public userForm = new FormGroup({
    'name': new FormControl(),
    'email': new FormControl(),
    'phone' : new FormControl(),
    'area' : new FormControl()
  });
  private user: any;
  public myDeals: Array<any>;
  public today: Date;
  public currentTab: boolean = true;
  public archivedTab: boolean = false;
  public currentArchived: boolean = true;;

  constructor(
    public navCtrl: NavController,
    private userService : UserServiceProvider,
    public alertCtrl : AlertController,
    public loginRegisterService: LoginRegisterProvider,
    public modalCtrl: ModalController
    ){
    
    console.log(this.user, 77);
    
  }

  /* private openLoginModal(){
    let modal = this.modalCtrl.create(LoginModalPage );

    modal.onDidDismiss(data => {
        //this.infoWindowOpen = !this.infoWindowOpen 
    });
    modal.present();
  } */

  ionViewWillEnter(){
    this.user = this.loginRegisterService.getUser();

    if(!this.user){
      alert('no user. Please log in');
      this.navCtrl.push(LoginPage);
      //this.openLoginModal();

    }else{
      this.myDeals = this.user.myDeals;
      this.today = new Date();
    }
  }

  //show archived deals
  public showArchived(){
    this.currentTab = false;
    this.archivedTab = true;
    this.currentArchived = false;
  }

  //show active deals
  public showActive(){
    this.currentTab = true;
    this.archivedTab = false;
    this.currentArchived = true;
  }

  //show different alerts depending what is passed in
  public showAlert(message?, phone?) {
    if(message){
      if(message === 'call'){
        let alert = this.alertCtrl.create({
          title: 'Call',
          subTitle: phone ,
          buttons: ['OK']
        });
        alert.present();    
      }else if(message === 'rate'){
        let alert = this.alertCtrl.create({
          title: 'Offline!',
          subTitle: "Rating Feature coming soon. (to help with AI suggestions)",
          buttons: ['OK']
        });
        alert.present();
      }  
    }else{
      let alert = this.alertCtrl.create({
        title: 'Offline!',
        subTitle: "Ooop's you have lost connectivity",
        buttons: ['OK']
      });
      alert.present();
    }  
  }
 
  public onSubmit(){
    this.userService.saveUser(this.userForm.value);
  }
}
