import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})


export class ContactPage {


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

  }

  onSubmit(){

    this.userService.saveUser(this.userForm.value);
  }

  

}
