import { Component, ViewEncapsulation } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Platform, ToastController } from "@ionic/angular";
import { FCM } from "@ionic-native/fcm/ngx";
import { Storage } from "@ionic/storage";

import { UserData } from "../../providers/user-data";

import { UserOptions, UserForm } from "../../interfaces/user-options";
import { StudentSvcProvider, User } from "../../providers/providers";
import { AppCenterAnalytics } from "@ionic-native/app-center-analytics/ngx";

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
    GroupCode: "",
    ParentLoginId: "",
    Password: "",
    MACAddress: ""
  };
  uuid = "";
  NOTIFICATIONTOPICS = "MY_NOTIFICATION_TOPICS";

  login: UserOptions = { username: "", password: "", GroupCode: "" };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    private fcm: FCM,
    public toastCtrl: ToastController,
    private platform: Platform,
    public storage: Storage,
    public userSvc: StudentSvcProvider,
    private user: User,
    private appCenterAnalytics: AppCenterAnalytics
  ) {}

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.account.ParentLoginId = this.login.username;
      this.account.Password = this.login.password;
      this.account.GroupCode = this.login.GroupCode;
      this.user.login(this.account).subscribe(
        respose => {
          this.user._loggedIn(respose);

          if (this.platform.is("android")) {
            this.appCenterAnalytics.setEnabled(true).then(() => {
              this.appCenterAnalytics
                .trackEvent("LOGIN_SUCCESS", {
                  UserName: this.login.username,
                  GroupCode: this.login.GroupCode
                })
                .then(() => {
                  console.log("Custom event tracked");
                });
            });

            this.loadFCM();
          }
          this.router.navigateByUrl("/users-list");
        },
        err => {
          if (this.platform.is("android")) {
            this.appCenterAnalytics.setEnabled(true).then(() => {
              this.appCenterAnalytics.trackEvent("LOGIN_FAILURE", {
                err: err
              });
            });
          }
        }
      );
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
