import { Component, OnInit } from '@angular/core';
import { NavController, ToastController,Platform } from '@ionic/angular';
import { StudentSvcProvider } from '../../providers/providers';
@Component({
  selector: 'syllabus',
  templateUrl: './syllabus.page.html',
  styleUrls: ['./syllabus.page.scss'],
})
export class SyllabusPage implements OnInit {
  details: any;

  constructor(public navCtrl: NavController,
    public taskSvc: StudentSvcProvider,
    public toastCtrl: ToastController,     
    public platform:Platform) {
  }

  ngOnInit() {
    this.getSylabuss();
  }

  getSylabuss(){
    let req = this.taskSvc.getSyllabus();
    req.subscribe((result: any) => {
      this.details = result;
      //console.log(this.details);
    })
  }
}
