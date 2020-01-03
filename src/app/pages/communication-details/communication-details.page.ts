import { Component, OnInit } from "@angular/core";
import { NavController, ToastController } from "@ionic/angular";
import { StudentSvcProvider } from "../../providers/providers";
@Component({
  selector: "communication-details",
  templateUrl: "./communication-details.page.html",
  styleUrls: ["./communication-details.page.scss"]
})
export class CommunicationDetailsPage implements OnInit {
  querys: any;
  constructor(
    public navCtrl: NavController,
    public Querysvc: StudentSvcProvider,
    public toastCtrl: ToastController
  ) {}

  ngOnInit() {
    let req = this.Querysvc.getRespondedQuerys();
    req.subscribe(
      (result: any) => {
        this.querys = result;
        console.log(this.querys);
      },
      () => {
        //this.navCtrl.setRoot(MainPage);
      }
    );
  }
}
