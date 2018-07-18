import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController,        AlertController } from 'ionic-angular';
import { BookingModalPage } from '../booking-modal/booking-modal';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';


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
  allowBooking: boolean = false;

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
        this.deals = data[0]['deals'];
      });

        this.userData = this.userService.getUserObs().subscribe((data) =>{
        this.userDeals = data[0]['myDeals'];
        this.user = data[0];
        console.log("constructor", this.user);
      })
  }

  public acceptDate(){
    this.allowBooking = true;
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

    if (!this.reservationForm.value.date) return;
   
    
    if (this.numberTaken < this.numberAvailable){
        this.numberTaken = this.numberTaken + 1;


        //this.markerInfo['bookedDate'] = this.reservationForm.value.date;
       //this.markerInfo['bookedTime'] = this.reservationForm.value.time;

        //push deal on to my-deals
        
        //temporarily take out anything after last 5
        if (this.userDeals.length > 4){
          this.userDeals.shift();
        }

        console.log("push1", this.userDeals);

        this.userDeals.push({
          dealDesc : this.markerInfo.currentDeal.dealDesc ,
          dealId : this.markerInfo.currentDeal.id,
          dealName : this.markerInfo.currentDeal.name,
          dealTimeStart : this.markerInfo.currentDeal.timeFrom,
          dealTimeEnd : this.markerInfo.currentDeal.timeTo,
          description: this.markerInfo.desc,
          id : this.markerInfo.id,
          img :  this.markerInfo.img,
          logoUrl : this.markerInfo.logoUrl,
          lat: this.markerInfo.lat,
          lng : this.markerInfo.long,
          phone : '001011',
          bookedDate: this.reservationForm.value.date,
          timeBooked: this.reservationForm.value.time,
          placeName: this.markerInfo.name,
          area : this.markerInfo.area 
        });
        
        //push on booking to current-deal
        //console.log(this.user.name, this.user.surname )

        console.log("push2", this.user);

        if(this.user){

          if (this.currentDeal.bookings.length > 4){
            this.currentDeal.bookings.shift();
          }

          this.currentDeal.bookings.push({
            name: this.user.name + ' ' + this.user.surname,
            phone: this.user.phone,
            email: this.user.email,
            dateBooked: this.reservationForm.value.date,
            timeBooked: this.reservationForm.value.time
          })
        }else{
          alert("fuckty");
        }

        
        

        this.markerDoc.update({
          'currentDeal.numberTaken' : this.numberTaken,
          'currentDeal.bookings' : this.currentDeal.bookings  
        });

        this.userDoc.update({
          'myDeals' : this.userDeals
        }); 

        let modal = this.modalCtrl.create(BookingModalPage,{

          markerInfo : this.markerInfo,
          user: this.user
    
        });
    
        modal.onDidDismiss(data => {
          
          data?  this.dismiss(data) : console.log('onDidDismiss sent',  data);
        });
     
        modal.present();
    

      
    } else{
      //delete currentDeal
      //this.currentDeal
      //push currentdeal to deals with timestamp and tracking tag (obj)
      //this.currentDeal.push()

      /* this.markerDoc.update({
        'currentDeal.numberTaken' : 10
      }); */

      //this.deals.push(this.markerInfo);
      this.markerDoc.update({
        'myDeals' : this.deals,
        'currentDeal.numberTaken' : 8
      }); 
      alert("this is the last deal.")
      return;
    }
    /* this.user['dealsAquired'].push(this.markerInfo); */
    //this.markerInfo.bookings.push(this.user)

  }
}
