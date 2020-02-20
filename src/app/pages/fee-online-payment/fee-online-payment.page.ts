import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Storage } from "@ionic/storage";

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
    private storage: Storage
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
    // TODO: make api call to created order the selected fee coponent details
    this.presentRazorPayWindow();
  }

  presentRazorPayWindow() {
    var options = {
      description: `Feepayment towards ${this.profileData.student.admissionNumber}`,
      image: `${this.profileData.student.profileImage}`, // replace this with school logo
      currency: "INR",
      key: "rzp_test_JpQZqqrSAn7cRl",
      order_id: "order_EInCeyNGAaoIe2",
      amount: this.selectedTerms.grandTotal,
      name: "TITO Edu", // replace this with school name
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
      alert("payment_id: " + success.razorpay_payment_id);
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
