import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { BookingModalPage } from '../booking-modal/booking-modal';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the RestModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rest-modal',
  templateUrl: 'rest-modal.html',
})
export class RestModalPage {

  public markerInfo: any;
  reservationForm = new FormGroup({
    'date': new FormControl(),
    'time': new FormControl()
  });
  showT: boolean;
  user: {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl:ModalController, 
    public viewCtrl:ViewController,
    public alertCtrl : AlertController,
    public userService: UserServiceProvider) {
      this.markerInfo = this.navParams.get('markerInfo');
      this.user = this.navParams.get('user');

      //console.log('this.user', this.user.dealsAquired);
      //this.markerInfo = navParams.get('markerInfo');
  }

  showTimes(){

    this.showT = !this.showT;
  }

  ionViewDidLoad() {
    
  }

  dismiss(bool) {
    //let data = { 'foo': 'bar' };
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

    this.userService.reservation(this.reservationForm.value)
  }


  reserve() {

    this.markerInfo['bookedDate'] = this.reservationForm.value.date;
    this.markerInfo['bookedTime'] = this.reservationForm.value.time;

    this.userService.user = this.user;
    

    this.user['dealsAquired'].push(this.markerInfo);
    //this.markerInfo.bookings.push(this.user)
    let modal = this.modalCtrl.create(BookingModalPage,{

      markerInfo : this.markerInfo,
      user: this.user
      
      /* 'date' : this.reservationForm.value.date,
      'time' : this.reservationForm.value.time */
    });

    modal.onDidDismiss(data => {
      console.log("here", data);
      data?  this.dismiss(data) : console.log('onDidDismiss sent',  data);
    });
 
    modal.present();


  }

  

}
