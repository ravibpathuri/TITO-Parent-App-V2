import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { StudentSvcProvider } from "../../providers/providers";

@Component({
  selector: "fee-online-payment",
  templateUrl: "./fee-online-payment.page.html",
  styleUrls: ["./fee-online-payment.page.scss"]
})
export class FeeOnlinePaymentPage implements OnInit {
  navParams: any;
  feeDetails: any;
  selectedTerms: any = [];
  profileData: any = { father: {}, student: {}, mother: {} };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private studentSvc: StudentSvcProvider
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.navParams = this.router.getCurrentNavigation().extras.state.parms;
      }
    });
  }

  ngOnInit() {
    this.feeDetails = this.navParams;
    if (!this.navParams) this.router.navigateByUrl("/app/tabs/fee");

    this.feeDetails.map(fee => {
      if (fee.isChecked) this.selectedTerms.push(fee);
    });
    let grandTotal = 0;
    this.selectedTerms.map(fee => {
      if (fee.isChecked) grandTotal += fee.totalDue;
    });
    this.selectedTerms.grandTotal = grandTotal;

    this.storage.get("MY_PROFILE_DATA").then(data => {
      if (data) {
        this.profileData = JSON.parse(data);
      }
    });
  }

  confirmAndPay() {
    this.studentSvc
      .createRazorpayOrder(this.selectedTerms)
      .subscribe(result => {
        this.presentRazorPayWindow(result);
      });
    //this.presentRazorPayWindow();
  }

  presentRazorPayWindow(result) {
    var options = {
      description: `Feepayment towards ${this.profileData.student.admissionNumber}`,
      image: `${result.schoolLogo ||
        "http://www.tito-edu.com/wp-content/uploads/2019/12/cropped-logo1.png"}`, // replace this with school logo
      currency: "INR",
      key: "rzp_test_partner_EJ2yQTllazhIsf",
      order_id: `${result.order_id}`,
      amount: this.selectedTerms.grandTotal,
      account_id: result.account_id,
      name: `${result.schoolName}`, // replace this with school name
      prefill: {
        email: this.profileData.father.email,
        contact: this.profileData.father.fatherContactNumber,
        name: this.profileData.father.fatherName
      },
      theme: {
        color: "#3880ff"
      }
    };

    var successCallback = function(success) {
      var orderId = success.razorpay_order_id;
      var signature = success.razorpay_signature;
    };

    var cancelCallback = function(error) {
      alert(error.description + " (Error " + error.code + ")");
    };

    RazorpayCheckout.on("payment.success", successCallback);
    RazorpayCheckout.on("payment.cancel", cancelCallback);
    RazorpayCheckout.open(options);
  }
}
