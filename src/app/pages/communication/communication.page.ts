import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { StudentSvcProvider } from "../../providers/providers";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { CommunicationForm } from "../../interfaces/user-options";

@Component({
  selector: "communication",
  templateUrl: "./communication.page.html",
  styleUrls: ["./communication.page.scss"]
})
export class CommunicationPage implements OnInit {
  account: CommunicationForm = {
    To_Whom: "",
    Text: "",
    Type: ""
  };

  constructor(
    public router: Router,
    public toastController: ToastController,
    public CommunicateSvc: StudentSvcProvider
  ) {}

  ngOnInit() {}

  Create(form: NgForm) {
    if (form.valid) {
      console.log(this.account);

      let req = this.CommunicateSvc.CreateQuery(this.account);
      req.subscribe(
        (result: any) => {
          let res = result;
          console.log(res);
          if (result != 0) {
            this.presentToast("Query Created Successfully!");
            this.router.navigateByUrl("/users-list");
          } else {
            this.presentToast("Something went wrong. Pleae try again!");
            this.router.navigateByUrl("/communication");
          }
        },
        err => {
          this.presentToast("Something went wrong. Pleae try again!");
        }
      );
    } else this.presentToast("All Fields are required");
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }
}
