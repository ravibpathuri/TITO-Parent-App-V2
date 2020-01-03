import { Component, OnInit,ElementRef ,ViewChild } from '@angular/core';
import {NavController, LoadingController, ToastController } from '@ionic/angular';
import { Chart } from 'chart.js'
import { StudentSvcProvider } from '../../providers/providers';
@Component({
  selector: 'attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  @ViewChild("barCanvas",null) barCanvas: ElementRef;
  barChart: any;
  attendanceDetails = []

   charData = {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: '# of Days School Runs',
        data: [],
        backgroundColor: '#fcfc00',
        borderWidth: 1,
        fill: false,
      },
      {
        label: '# of Days Attended',
        data: [],
        backgroundColor: '#427feb',
        borderWidth: 1,
        fill: false,
      }]
    },

  }
  constructor(
    public navCtrl: NavController,    
    public attendanceSvc: StudentSvcProvider,
    public toastCtrl: ToastController,
    public loadingController: LoadingController
  ) {
  }


  ngOnInit() {
    let req = this.attendanceSvc.getAttendance();

    req.subscribe((result: any) => {

      this.attendanceDetails = result.attendence;
      // console.log(this.attendanceDetails);

      this.charData.data.labels = result.month;
      this.charData.data.datasets[0].data = result.schoolDays;
      this.charData.data.datasets[1].data = result.attended;
      this.barChart = new Chart(this.barCanvas.nativeElement, this.charData);
  })
}

}
