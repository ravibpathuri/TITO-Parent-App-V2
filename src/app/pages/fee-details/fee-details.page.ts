import { Component, OnInit } from "@angular/core";

import { Router, NavigationExtras } from "@angular/router";
import {
  NavController,
  ToastController,
  LoadingController,
  IonNavPush,
  IonNav
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
    public router: Router,
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
      term.isChecked = false;
    });
    return;
  }

  proceedToPay() {
    console.log(this.feeDetails);

    // reconcile term check boxes
    for (let i = 3; i >= 1; i--) {
      let t = this.feeDetails.find(f => f.feeTerm == i);
      let t2 = this.feeDetails.find(f => f.feeTerm == i - 1);
      if (t.isChecked && t2) t2.isChecked = true;
    }
    console.log(this.feeDetails);
    // this.router.navigateByUrl("/fee-online-payment",);
    //this.navCtrl.navigateForward('',)

    let navigationExtras: NavigationExtras = {
      state: {
        user: "name",
        parms: this.feeDetails
      }
    };
    this.navCtrl.navigateForward("/fee-online-payment", navigationExtras);
  }

  feeTermSelected(feeTerm) {
    let termNumber = parseInt(feeTerm.feeTerm);

    for (let i = termNumber - 1; i >= 1; i--) {
      let t = this.feeDetails.find(f => f.feeTerm == i);
      if (feeTerm.isChecked && t) t.isChecked = true;
    }
  }
}
