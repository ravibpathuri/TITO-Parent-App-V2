import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Platform, ToastController } from "@ionic/angular";
import { NgForm } from "@angular/forms";
import { StudentSvcProvider, User } from "../../providers/providers";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "profile-edit",
  templateUrl: "./profile-edit.page.html",
  styleUrls: ["./profile-edit.page.scss"]
})
export class ProfileEditPage implements OnInit {
  MY_PROFILE_DATA = "MY_PROFILE_DATA";
  profile: any = { student: {}, father: {}, mother: {} };
  constructor(
    private platform: Platform,
    public profileSvc: StudentSvcProvider,
    public toastController: ToastController,
    public router: Router,
    private sanitizer: DomSanitizer,
    public storage: Storage
  ) {}

  ngOnInit() {
    this.storage.get(this.MY_PROFILE_DATA).then(data => {
      this.profile = JSON.parse(data);
      console.log(this.profile);
    });
  }
  updateProfile(form: NgForm) {
    {
      if (form.valid) {
        this.profileSvc.saveProfile(this.profile).subscribe(
          resp => {
            //console.log(resp);
            let result = resp;
            if (result != null) {
              this.presentToast("Detetails Changed Successfully!");
              this.router.navigateByUrl("/profile-edit");
            } else {
              this.presentToast("Something went wrong. Pleae try again!");
            }
          },
          err => {
            this.presentToast("Something went wrong. Pleae try again!");
          }
        );
      } else this.presentToast("All Fields are required");
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }
}
