import { Component } from '@angular/core';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { ReservationsPage } from '../reservations/reservations';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ReservationsPage;
  tab3Root = ContactPage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
