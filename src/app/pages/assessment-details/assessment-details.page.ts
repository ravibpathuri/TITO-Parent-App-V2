import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { StudentSvcProvider } from "../../providers/providers";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "assessment-details",
  templateUrl: "./assessment-details.page.html",
  styleUrls: ["./assessment-details.page.scss"]
})
export class AssessmentDetailsPage implements OnInit {
  assessment;
  assessmentDetails;

  constructor(
    public toastCtrl: ToastController,
    public assessmentSvc: StudentSvcProvider,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    const assessmentId = this.route.snapshot.paramMap.get("assessmentId");
    console.log(assessmentId);

    let req = this.assessmentSvc.getAssessmentDetail(assessmentId);

    req.subscribe((result: any) => {
      this.assessmentDetails = result;
    });
  }
}
