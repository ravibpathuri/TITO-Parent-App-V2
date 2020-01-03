import { Component, OnInit } from '@angular/core';
import { StudentSvcProvider, User } from "../../providers/providers";
import { LoadingController, Platform } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { FCM } from "@ionic-native/fcm/ngx";
import { Toast } from "@ionic-native/toast/ngx";
import { Router } from "@angular/router";

@Component({
  selector: 'notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  NOTIFICATIONTOPICS = "MY_NOTIFICATION_TOPICS";
  sub: any;
  Notifications: any;
  backend: any
  constructor(
    public notificationSvc: StudentSvcProvider,
    public loadingController: LoadingController,
    public user: User,
    private platform: Platform,
    public storage: Storage,
    private fcm: FCM,
    private toast: Toast,
    public router: Router
  ) {
    
  }

  ngOnInit() {
    this.loadNotifications();
  }

  loadFCM() {
    // get topics from api and suscribe
    this.notificationSvc.getNotificationTopics().subscribe((topics: any) => {
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


  loadNotifications() {
    this.notificationSvc.getNotifications().subscribe(result => {
      this.Notifications = result;
    });
  }
}
