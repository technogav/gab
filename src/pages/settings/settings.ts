import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})


export class SettingsPage {


  userForm = new FormGroup({
    'name': new FormControl(),
    'email': new FormControl(),
    'phone' : new FormControl(),
    'area' : new FormControl()
    

  });

  constructor(
    public navCtrl: NavController,
    private userService : UserServiceProvider
    /* public user: User */
    ) {

      console.log('settings constructor fired');

  }

  

  ionViewDidEnter(){
   console.log('settings view entered');
  }


  ionViewWillEnter(){
   console.log('settings view will enter');
  }

  onSubmit(){

    this.userService.saveUser(this.userForm.value);
  }

  

}
