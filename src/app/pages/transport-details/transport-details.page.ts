import { Component, OnInit } from "@angular/core";
import {
  NavController,
  LoadingController,
  ToastController
} from "@ionic/angular";
import { StudentSvcProvider } from "../../providers/providers";
@Component({
  selector: "transport-details",
  templateUrl: "./transport-details.page.html",
  styleUrls: ["./transport-details.page.scss"]
})
export class TransportDetailsPage implements OnInit {
  transportDetails: any;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingController: LoadingController,
    public vehicleSvc: StudentSvcProvider
  ) {}

  ngOnInit() {
    let req = this.vehicleSvc.getVehicleDetails();

    req.subscribe((result: any) => {
      if (result != null) {
        this.transportDetails = result;
        //console.log(this.transportDetails);
      }
    });
  }
}
