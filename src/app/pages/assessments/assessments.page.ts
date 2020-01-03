import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { StudentSvcProvider } from "../../providers/providers";
@Component({
  selector: "assessments",
  templateUrl: "./assessments.page.html",
  styleUrls: ["./assessments.page.scss"]
})
export class AssessmentsPage implements OnInit {
  currentAssements = [];
  AssessmentDetailsPage = "AssessmentDetailsPage";
  constructor(
    public assementsProvider: StudentSvcProvider,
    public toastCtrl: ToastController
  ) {}

  ngOnInit() {
    let req = this.assementsProvider.getAssessments();
    req.subscribe((result: any) => {
      this.currentAssements = result;
      //console.log(this.currentAssements)
    });
  }

  // itemSelected(item) {
  //   console.log(item);
  //   this.navCtrl.navigateForward(AssessmentDetailsPage, item);
  // }
}
