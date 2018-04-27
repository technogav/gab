import { Component } from '@angular/core';
import { NavController, Item } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  item: Observable<Item>;

  constructor(
    public navCtrl: NavController, 
    ) { 
  }

  searchQuery: string = '';
  items: string[];

  public cachedRestaurants:Array<any> = [
    {
    'name' : 'Restaurant1',
    'description' : 'A nice place'
    },
    {
      'name' : 'Bestaurant2',
      'description' : 'Dis nice place'
    }
  ];

  initializeItems() {
    this.items = [
      this.cachedRestaurants[0].name,
      this.cachedRestaurants[1].name
      
    ];

    
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  



  

  

}
