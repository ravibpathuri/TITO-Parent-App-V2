import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { SwUpdate } from "@angular/service-worker";

import {
  MenuController,
  Platform,
  ToastController,
  AlertController
} from "@ionic/angular";

import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { Storage } from "@ionic/storage";

import { UserData } from "./providers/user-data";
import { StudentSvcProvider, User } from "./providers/providers";
import { FCM } from "@ionic-native/fcm/ngx";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: "Home",
      url: "/app/tabs/profile",
      icon: "home"
    },
    {
      title: "SMS-Messages",
      url: "/messages",
      icon: "mail"
    },
    { title: "Notifications", url: "/notifications", icon: "megaphone" },
    { title: "Diary", url: "/daily-diary", icon: "paper" },
    { title: "Syllabus", url: "/syllabus", icon: "book" },
    { title: "Fee", url: "/fees/tabs/fee-details", icon: "cash" },
    { title: "Attendance", url: "/attendance", icon: "pie" },
    { title: "Holidays", url: "/holidays", icon: "calendar" },
    { title: "Assessments", url: "/assessments", icon: "clipboard" },
    { title: "Transport", url: "/transport-details", icon: "bus" },
    { title: "Photos", url: "/photos", icon: "images" },
    { title: "Update Password", url: "/reset-password", icon: "key" },
    { title: "Communicate", url: "/communication", icon: "chatbubbles" }
  ];
  loggedIn = true;
  dark = false;

  profile: any = { student: {} };
  studentInfo: any = { Student: {} };

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    public profileSvc: StudentSvcProvider,
    public user: User,
    private fcm: FCM,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.checkLoginStatus();
    //this.listenForLoginEvents();

    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: "Update available!",
        showCloseButton: true,
        position: "bottom",
        closeButtonText: `Reload`
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkLoginStatus() {
    this.storage.get("currentUser").then(data => {
      if (data) {
        this.studentInfo = JSON.parse(data);
        console.log(this.studentInfo);
      }
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  logout() {
    // un-subscribe from topics
    if (this.platform.is("android")) {
      this.storage.get("MY_NOTIFICATION_TOPICS").then(myTopics => {
        // Un-Subscribe to each topic
        myTopics.forEach(topicName => {
          this.fcm.unsubscribeFromTopic(topicName);
        });
      });
    }

    // do logout
    this.user.logout();

    // route to users-list
    setTimeout(() => {
      return this.router.navigateByUrl("/users-list");
    }, 3000);
  }

  async presentLogoutConfirm() {
    const alert = await this.alertController.create({
      header: "Confirm!",
      message: "Are you sure you want to <strong>Logout</strong>!!!",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "Okay",
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }
}
