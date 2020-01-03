import { Component, OnInit } from '@angular/core';
import {NavController,ToastController, Platform } from '@ionic/angular';
import { StudentSvcProvider } from '../../providers/providers';
@Component({
  selector: 'holidays',
  templateUrl: './holidays.page.html',
  styleUrls: ['./holidays.page.scss'],
})
export class HolidaysPage implements OnInit {
  holidays: any;
  constructor(public navCtrl: NavController,    
    public holidaysSvc: StudentSvcProvider,
    public toastCtrl: ToastController,
    public platform: Platform) {

  }


  ngOnInit() {
    let req = this.holidaysSvc.getHolidays();
    req.subscribe((result: any) => {
      this.holidays = result;
      console.log(this.holidays);

    })
  }

}
