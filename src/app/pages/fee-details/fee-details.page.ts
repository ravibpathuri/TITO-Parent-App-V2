import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ToastController,
  LoadingController
} from "@ionic/angular";
import { StudentSvcProvider } from "../../providers/providers";

@Component({
  selector: "fee-details",
  templateUrl: "./fee-details.page.html",
  styleUrls: ["./fee-details.page.scss"]
})
export class FeeDetailsPage implements OnInit {
  feeDetails = [];
  TermTotalAmount = [];
  TermTotalDue = [];

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingController: LoadingController,
    public feeSvc: StudentSvcProvider
  ) {}

  ngOnInit() {
    let req = this.feeSvc.getFeeDetails().subscribe((result: any) => {
      this.feeDetails = result;
      this.GetTotals();
    });
  }

  public GetTotals() {
    this.feeDetails.forEach(term => {
      term.totalDue = 0;
      term.totalFee = 0;

      let totalDue = 0;
      let totalFee = 0;
      term.feeComponents.forEach(component => {
        totalDue += component.due;
        totalFee += component.toalAmount;
      });

      term.totalDue = totalDue;
      term.totalFee = totalFee;
    });
    return;
  }
}
