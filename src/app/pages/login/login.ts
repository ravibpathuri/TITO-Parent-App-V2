import { Component, ViewEncapsulation } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Platform, ToastController } from "@ionic/angular";
import { FCM } from "@ionic-native/fcm/ngx";
import { Storage } from "@ionic/storage";

import { UserData } from "../../providers/user-data";

import { UserOptions, UserForm } from "../../interfaces/user-options";
import { StudentSvcProvider, User } from "../../providers/providers";

@Component({
  selector: "page-login",
  templateUrl: "login.html",
  styleUrls: ["./login.scss"]
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: UserForm = {
    GroupCode: "TITO",
    ParentLoginId: "",
    Password: "",
    MACAddress: ""
  };
  uuid = "";
  NOTIFICATIONTOPICS = "MY_NOTIFICATION_TOPICS";

  login: UserOptions = { username: "", password: "" };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    private fcm: FCM,
    public toastCtrl: ToastController,
    private platform: Platform,
    public storage: Storage,
    public userSvc: StudentSvcProvider,
    private user: User
  ) {}

  onLogin(form: NgForm) {
    this.submitted = true;

    console.log(this.login);

    if (form.valid) {
      this.account.ParentLoginId = this.login.username;
      this.account.Password = this.login.password;

      console.log(this.account);

      this.user.login(this.account);

      if (this.platform.is("android")) {
        this.loadFCM();
      }
      this.router.navigateByUrl("/app/tabs/profile");
    }
  }

  loadFCM() {
    try {
      // get topics from api and suscribe
      let req = this.userSvc
        .getNotificationTopics()
        .subscribe((notificationResp: any) => {
          this.storage.set(
            this.NOTIFICATIONTOPICS,
            JSON.stringify(notificationResp)
          );

          // subscribe to each topic
          notificationResp.forEach(element => {
            //console.log("topic: " + element);
            this.fcm.subscribeToTopic(element);
          });
        });
    } catch (error) {}

    return;
  }
}
