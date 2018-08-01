import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController,        AlertController } from 'ionic-angular';
//import { BookingModalPage } from '../booking-modal/booking-modal';
import { BookingConfirmationPage } from '../booking-confirmation/booking-confirmation';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { LoginPage } from '../login/login';
import { LoginRegisterProvider } from '../../providers/login-register/login-register';

@Component({
  selector: 'page-rest-modal',
  templateUrl: 'rest-modal.html',
})
export class RestModalPage {

  public markerInfo: any;
  public reservationForm = new FormGroup({
    'date': new FormControl(),
    'time': new FormControl()
  });

  private user: any;
  /* markerDoc: any;
  markerDoc$: any; */
  //numberTaken: number;
  //numberAvailable: number;
  documentData: any;
  currentDeal: any;
  userData: any;
  userDoc: any;

  deals: any;
  dealsData: any;
  allowBooking: boolean = false;

  constructor(
    
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl:ModalController, 
    public viewCtrl:ViewController,
    public alertCtrl : AlertController,
    public userService: UserServiceProvider,
    private loginRegisterService : LoginRegisterProvider) {
    this.markerInfo = this.navParams.get('markerInfo');

    /* this.userData = this.userService.getUserObs().subscribe((data) =>{

    this.user = data[0]; 
    })*/
    console.log('rest-modal cons');
    this.user = this.loginRegisterService.getUser();

  }

  public acceptDate(){
    this.allowBooking = true;
  }

  showTimes(){
    console.log('showTimes')
  }

  ionViewDidEnter(){}

  ionViewWillEnter() {}

  ionViewWillLeave(){}

  dismiss(bool) {
    this.viewCtrl.dismiss(bool);
  }

  public showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Coming Soon',
      subTitle: "This feature is not available yet",
      buttons: ['OK']
    });
    alert.present();
  }

  onSubmit(){
    this.userService.reservation(this.reservationForm.value);
  }

  private checkIfLoggedIn(){

    if (this.user){
      return true;
    }else{
      alert("not logged in");
      this.navCtrl.push(LoginPage);
      return false;
    }
  }

  reserve() {
    this.user = this.loginRegisterService.getUser();

    if (!this.checkIfLoggedIn()) return; 
    if (!this.reservationForm.value.date) return;
  
    let date = this.reservationForm.value.date;
    let time = this.reservationForm.value.time;

    this.userService.setMarkerRef(this.markerInfo, date, time, this.user);

      /* let modal = this.modalCtrl.create(BookingModalPage,{
        markerInfo : this.markerInfo,
        user: this.user
      }); 
  
      modal.onDidDismiss(data => {  
        data?  this.dismiss(data) : console.log('onDidDismiss sent',  data);
      });
    
      modal.present();*/  

      this.navCtrl.push(BookingConfirmationPage, {
        markerInfo : this.markerInfo,
        user: this.user
      })
    } 
}
