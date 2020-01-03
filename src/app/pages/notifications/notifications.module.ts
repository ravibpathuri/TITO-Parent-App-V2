import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NotificationsPageRoutingModule } from "./notifications-routing.module";

import { NotificationsPage } from "./notifications.page";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPageRoutingModule,
    PipesModule
  ],
  declarations: [NotificationsPage]
})
export class NotificationsPageModule {}
