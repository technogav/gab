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

  user: any;
  user$: any;
  markerDoc: any;
  markerDoc$: any;
  numberTaken: number;
  numberAvailable: number;
  documentData: any;
  currentDeal: any;
  userData: any;
  userDoc: any;
  userDeals: Array<any> = [];
  deals: any;
  dealsData: any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl:ModalController, 
    public viewCtrl:ViewController,
    public alertCtrl : AlertController,
    public userService: UserServiceProvider) {

      this.markerInfo = this.navParams.get('markerInfo');
      //this.user = this.navParams.get('user');

      this.documentData = this.userService.getDocObs().subscribe((data) =>{
        this.numberTaken = data[0]['currentDeal'].numberTaken;
        this.numberAvailable = data[0]['currentDeal'].numberAvailable;
        this.currentDeal = data[0]['currentDeal'];
        //this.deals = data[0]['deals'];
        this.deals = data[0]['deals'];
      });

      this.userData = this.userService.getUserObs().subscribe((data) =>{
        this.userDeals = data[0]['myDeals'];
        this.user = data[0];
      })
  }



  showTimes(){
    this.showT = !this.showT;
  }

  ionViewDidEnter(){
    
  }

  ionViewWillEnter() {
    
    this.userDoc = this.userService.getUserDoc();
    this.markerDoc = this.userService.getMarkerDoc();
    
    
  }

  ionViewWillLeave(){
   this.documentData.unsubscribe();
   this.userData.unsubscribe();
   //this.dealsData.unsubscribe();
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
    console.log("reserve", this.numberTaken)
    

    

    if (this.numberTaken < this.numberAvailable){
        this.numberTaken = this.numberTaken + 1;
        console.log("reserve", this.numberTaken)
        console.log(222, this.user.name, this.user.surname,this.user.phone, this.user.email, this.numberTaken, this.numberAvailable);

        //console.log(this.reservationForm.value.date, this.reservationForm.value.time);

        //this.markerInfo['bookedDate'] = this.reservationForm.value.date;
       //this.markerInfo['bookedTime'] = this.reservationForm.value.time;

        //push deal on to my-deals
        this.userDeals.push(this.markerInfo);
        //push on booking to current-deal
        this.currentDeal.bookings.push({
          name: this.user.name + ' ' + this.user.surname,
          phone: this.user.phone,
          email: this.user.email,
          dateBooked: this.reservationForm.value.date,
          timeBooked: this.reservationForm.value.time, 
        })


        //this.currentDeal
        //push changes to cloud
        this.markerDoc.update({
          'currentDeal.numberTaken' : this.numberTaken,
          'currentDeal.bookings' : this.currentDeal.bookings  
        });
        this.userDoc.update({
          'myDeals' : this.userDeals
        }); 

      
    } else{
      console.log("else");
      //delete currentDeal
      //this.currentDeal
      //push currentdeal to deals with timestamp and tracking tag (obj)
      //this.currentDeal.push()

      /* this.markerDoc.update({
        'currentDeal.numberTaken' : 10
      }); */

      //this.deals.push(this.markerInfo);
      console.log(this.deals);

      this.markerDoc.update({
        'myDeals' : this.deals,
        'currentDeal.numberTaken' : 10
      }); 
    }

    

    /* this.user['dealsAquired'].push(this.markerInfo); */
    //this.markerInfo.bookings.push(this.user)
    let modal = this.modalCtrl.create(BookingModalPage,{

      markerInfo : this.markerInfo,
      user: this.user
      
      /* 'date' : this.reservationForm.value.date,
      'time' : this.reservationForm.value.time */
    });

    modal.onDidDismiss(data => {
      
      data?  this.dismiss(data) : console.log('onDidDismiss sent',  data);
    });
 
    modal.present();


  }

  

}
