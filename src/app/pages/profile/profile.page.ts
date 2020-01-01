import { Component, OnInit } from "@angular/core";
import { StudentSvcProvider, User } from "../../providers/providers";
import { LoadingController, Platform } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { FCM } from "@ionic-native/fcm/ngx";
import { Toast } from "@ionic-native/toast/ngx";
import { Router } from "@angular/router";

@Component({
  selector: "profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  profile: any = { student: {}, father: {}, mother: {} };
  pageParams = {};

  // Our translated text strings
  private loginErrorString: string;
  NOTIFICATIONTOPICS = "MY_NOTIFICATION_TOPICS";
  backend: any;

  constructor(
    public profileSvc: StudentSvcProvider,
    public loadingController: LoadingController,
    public user: User,
    private platform: Platform,
    public storage: Storage,
    private fcm: FCM,
    private toast: Toast,
    public router: Router
  ) {
    this.presentLoading();
    this.refreshToken();
  }

  ngOnInit() {}

  refreshToken() {
    this.user.refreshToken().subscribe(
      response => {
        //console.log(resp);
        // load Firebase Console Mnager only if we got new token
        if (response) {
          if (this.platform.is("android")) {
            this.storage.get("MY_NOTIFICATION_TOPICS").then(myTopics => {
              // Un-Subscribe to each topic
              myTopics.forEach(topicName => {
                //console.log("topic: " + element);
                this.fcm.unsubscribeFromTopic(topicName);
              });
            });
          }
        }

        // get profile data with latest token
        this.getProfileData();

        // re-subscribe to new topics
        //this.loadFCM();
      },
      err => {
        // get profile data with old token
        this.getProfileData();

        this.toast
          .show(`Something Wrong. Please try after some time`, "3000", "bottom")
          .subscribe(toast => {
            console.log(toast);
          });
      }
    );
  }

  getProfileData() {
    this.profileSvc.getProfile().subscribe(result => {
      this.profile = result;
    });
  }

  loadFCM() {
    // get topics from api and suscribe
    this.profileSvc.getNotificationTopics().subscribe((topics: any) => {
      this.storage.set(this.NOTIFICATIONTOPICS, JSON.stringify(topics));

      // subscribe to each topic
      topics.forEach(topicName => {
        this.fcm.subscribeToTopic(topicName);
      });
    });

    // when notification is received
    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        this.router.navigateByUrl("/notification");
      } else {
      }
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Loading Profle, please wait...",
      duration: 2000,
      translucent: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log("Loading dismissed!");
  }
}
