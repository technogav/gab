//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GeoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeoServiceProvider {

  constructor() {
    console.log('Hello GeoServiceProvider Provider');
  }

  private rests=[
    {
      'name': 'Weeping Thaiger',
      'type' : 'Asian',
      'takeaway-restaurant' : 'restaurant',
      'area' : 'Newbridge',
      'lat': 53.17628863349991, 
      'long': -6.80227794371217, 
      'img' : '/assets/imgs/weepingThaigerInside.jpg', 
      'desc' : '160chars or less',
      'currentDeal' : {'id': '1','dealDesc' : 'Early bird Special. 10% off any evening meal plus a free bottle of wine'}
    },
    {
      'name': 'Judge Roy Beans',
      'type' : 'Asian',
      'takeaway-restaurant' : 'restaurant',
      'area' : 'Newbridge',
      'lat': 53.177986220418724, 
      'long': -6.801419636827404,
      'img' : '/assets/imgs/jrbInside.jpg',  
      'desc' : '160chars or less',
      'currentDeal' : {'id': '1','dealDesc' : 'Kids eat for Free. Plus one round of soft drinks!'}
    },
    {
      'name': 'Weeping Thaiger',
      'type' : 'Asian',
      'takeaway-restaurant' : 'both',
      'area' : 'Newbridge',
      'lat': 53.12923805346222, 
      'long': -6.7583513259887695,
      'img' : '/assets/imgs/restaurant_inside.jpg',  
      'desc' : '160chars or less',
      'currentDeal' : {'id': '1','dealDesc' : 'Early bird Special. 10% off any evening meal plus a free bottle of wine'}
    },
    {
      'name': 'Fallons',
      'type' : 'Traditional',
      'takeaway-restaurant' : 'restaurant',
      'area' : 'Kilcullen',
      'lat': 53.13207946265469, 
      'long': -6.741237254613679,
      'img' : '/assets/imgs/fallonsInside.jpg', 
      'desc' : '160chars or less',
      'currentDeal' : {'id': '1','dealDesc' : '20% off friday night! Selected menu.'}
    },
    {
      'name': 'Bardons',
      'type' : 'Traditional',
      'takeaway-restaurant' : 'restaurant',
      'area' : 'Kilcullen',
      'lat': 53.131387625249616,
      'long': -6.744749119465723, 
      'img' : '/assets/imgs/bardonsInside.jpg',
      'desc' : '160chars or less',
      'currentDeal' : {'id': '1','dealDesc' : 'Buy one desert get one free'}
    },
    {
      'name': 'Weeping Thaiger',
      'type' : 'Asian',
      'takeaway-restaurant' : 'restaurant',
      'area' : 'Newbridge',
      'lat': 53.346093449906036, 
      'long': -6.280660629272461,
      'img' : '/assets/imgs/restaurant_inside.jpg', 
      'desc' : '160chars or less',
      'currentDeal' : {'id': '1','dealDesc' : 'Early bird Special. 10% off any evening meal plus a free bottle of wine'}
    },
    {
      'name': 'Weeping Thaiger',
      'type' : 'Asian',
      'takeaway-restaurant' : 'restaurant',
      'area' : 'Newbridge',
      'lat': 53.34706698318468, 
      'long': -6.299457550048828, 
      'img' : '/assets/imgs/restaurant_inside.jpg',
      'desc' : '160chars or less',
      'currentDeal' : {'id': '1','dealDesc' : 'Early bird Special. 10% off any evening meal plus a free bottle of wine'}
    }
    
    
    
  ];

  public getRests(){
    return this.rests;
  }

}
