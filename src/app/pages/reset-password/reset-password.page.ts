import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { StudentSvcProvider } from "../../providers/providers";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { ResetPasswordForm } from "../../interfaces/user-options";
@Component({
  selector: "reset-password",
  templateUrl: "./reset-password.page.html",
  styleUrls: ["./reset-password.page.scss"]
})
export class ResetPasswordPage implements OnInit {
  result: any;

  account: ResetPasswordForm = {
    currentPassword: "",
    newPassword: "",
    re_newPassword: "",
    groupCode: ""
  };

  constructor(
    public router: Router,
    public toastController: ToastController,
    public accountsrc: StudentSvcProvider
  ) {}

  ngOnInit() {}
  changePWD(form: NgForm) {
    console.log(this.account);
    if (form.valid) {
      if (this.account.newPassword == this.account.re_newPassword) {
        this.accountsrc.changePassword(this.account).subscribe(
          resp => {
            //console.log(resp);
            this.result = resp;
            if (this.result == 1) {
              this.presentToast("Password Changed Successfully!");
              this.router.navigateByUrl("/users-list");
            } else {
              this.presentToast("Something went wrong. Pleae try again!");
            }
          },
          err => {
            this.presentToast("Something went wrong. Pleae try again!");
          }
        );
      } else
        this.presentToast("New password  and Re-Enter Password not Matched");
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
