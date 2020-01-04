import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { IonicModule, Platform } from "@ionic/angular";
import { IonicStorageModule } from "@ionic/storage";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { FormsModule } from "@angular/forms";
import { FCM } from "@ionic-native/fcm/ngx";
import {
  StudentSvcProvider,
  Api,
  TokenIntercepter,
  User
} from "./providers/providers";
import { Toast } from "@ionic-native/toast/ngx";

@NgModule({
  imports: [
    // BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  declarations: [AppComponent],
  providers: [
    InAppBrowser,
    SplashScreen,
    StatusBar,
    FCM,
    Toast,
    StudentSvcProvider,
    User,
    Api,
    Platform,
    Storage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercepter,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
