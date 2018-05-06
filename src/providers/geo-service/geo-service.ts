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
    {'lat': 53.550140, 'long': -6.422, 'desc' : 'This is Restaurant 1' },
    {'lat': 53.450140, 'long': -6.266155, 'desc': 'This is restaurant 2' },
    {'lat': 53.12923805346222, 'long': -6.7583513259887695, 'desc': 'This is restaurant 3' },
    {'lat': 53.12339246847727, 'long': -6.751956939697266, 'desc': 'This is restaurant 4' },
    {'lat': 53.13060276718703, 'long': -6.753888130187988, 'desc': 'This is restaurant 5' },
    {'lat': 53.346093449906036, 'long': -6.280660629272461, 'desc': 'This is restaurant 6' },
    {'lat': 53.342173470976626, 'long': -6.286196708679199, 'desc': 'NOahs Place!' },
    {'lat': 53.34706698318468, 'long': -6.299457550048828, 'desc': 'This is restaurant 8' }
    
  ];

  public getRests(){
    return this.rests;
  }

}
