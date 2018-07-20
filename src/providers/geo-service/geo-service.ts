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
      'type' : 'restaurant',
      'takeaway-restaurant' : 'restaurant',
      'area' : 'Newbridge',
      'lat': 53.17628863349991, 
      'long': -6.80227794371217, 
      'img' : '/assets/imgs/weep.png', 
      'desc' : '160chars or less',
      'currentDeal' : {'id': '1','dealDesc' : 'Early bird Special. 10% off any evening meal plus a free bottle of wine'}
    },
    {
      'name': 'Judge Roy Beans',
      'type' : 'pub',
      'takeaway-restaurant' : 'restaurant',
      'area' : 'Newbridge',
      'lat': 53.177986220418724, 
      'long': -6.801419636827404,
      'img' : '/assets/imgs/jrb.png',  
      'desc' : '160chars or less',
      'currentDeal' : {'id': '1','dealDesc' : 'Kids eat for Free. Plus one round of soft drinks!'}
    },
    {
      'name': 'Weeping Thaiger',
      'type' : 'restaurant',
      'takeaway-restaurant' : 'both',
      'area' : 'Newbridge',
      'lat': 53.12923805346222, 
      'long': -6.7583513259887695,
      'img' : '/assets/imgs/weep.png',  
      'desc' : '160chars or less',
      'currentDeal' : {'id': '1','dealDesc' : 'Early bird Special. 10% off any evening meal plus a free bottle of wine'}
    },
    {
      'name': 'Fallons',
      'type' : 'entertainment',
      'takeaway-restaurant' : 'restaurant',
      'area' : 'Kilcullen',
      'lat': 53.13207946265469, 
      'long': -6.741237254613679,
      'img' : '/assets/imgs/fallonsInside.jpg', 
      'desc' : '160chars or less',
      'currentDeal' : {'id': '1','dealDesc' : '20% off friday night! Selected menu.'}
    },
    {
      'name': 'Bardons Restaurant',
      'type' : 'restaurant',
      'takeaway-restaurant' : 'restaurant',
      'area' : 'Kilcullen',
      'lat': 53.131387625249616,
      'long': -6.744749119465723, 
      'img' : '/assets/imgs/bardons.png',
      'desc' : '160chars or less',
      'currentDeal' : {'id': '1','dealDesc' : 'Buy one desert get one free'}
    },
    {
      'name': 'Weeping Thaiger',
      'type' : 'restaurant',
      'takeaway-restaurant' : 'restaurant',
      'area' : 'Newbridge',
      'lat': 53.346093449906036, 
      'long': -6.280660629272461,
      'img' : '/assets/imgs/restaurant_inside.jpg', 
      'desc' : '160chars or less',
      'currentDeal' : {'id': '1','dealDesc' : 'Early bird Special. 10% off any evening meal plus a free bottle of wine'}
    },
    {
      'name': 'ODEAN Cinema Newbridge',
      'type' : 'entertainment',
      'takeaway-restaurant' : 'restaurant',
      'area' : 'Newbridge',
      'lat': 53.17687460947875, 
      'long': -6.7984137056042755, 
      'img' : '/assets/imgs/images.png',
      'desc' : 'We pride ourselves in the very best cinema experience: cutting-edge technology and the widest choice of experiences (this extends way beyond the box office – we also screen live sports and cultural events and special screenings for specific groups too',
      'currentDeal' : {
        'id': '1', 
        'name': 'Summer Madness', 
        'dealDesc' : 'Two tickets, one large popcorn and two medium soft drinks only €20', 'conditions': 'You must present the your booking to the staff upon arrival through our QR code that will be generated. Deal is only valid between the specified times.', 'startTime': '09:00', 
        'endTime': '22:00', 
        'startDate': '5th May 2018', 
        'endDate' : '6th May 2018', 
        'weeklyRecurring': false}
    },
    {
      'name': 'River Bank Theater',
      'type' : 'entertainment',
      'takeaway-restaurant' : 'restaurant',
      'area' : 'Newbridge',
      'lat': 53.18202979360638, 
      'long': -6.79446068902007, 
      'img' : '/assets/imgs/riverBank.jpg',
      'desc' : 'Riverbank Arts Centre hosts a programme of local, national and international productions including theatre, music, opera, comedy and visual arts. The venue comprises of a 180 seat auditorium, Children’s Gallery, McKenna Gallery, a contemporary gallery hosting both local national and international artists,  and a café. ',
      'currentDeal' : {
        'id': '1', 'name': 'Summer Madness', 
        'dealDesc' : 'Admission for two to see Mama Mia and two free coffee just €20',
        'conditions': 'You must present the your booking to the staff upon arrival through our QR code that will be generated. Deal is only valid between the specified times.', 'startTime': '09:00', 
        'endTime': '22:00', 
        'startDate': '5th May 2018', 
        'endDate' : '6th May 2018', 
        'weeklyRecurring': false,
        'bookings' : {},
        'viewed' : 0,
        'whoViewed' : {}
      }
    }
    
    
    
  ];


  
  public getRests(){
    return this.rests;
  }

}
