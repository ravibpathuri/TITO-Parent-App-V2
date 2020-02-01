import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { QuerysPage } from "./querys.page";

const routes: Routes = [
  {
    path: "tabs",
    component: QuerysPage,
    children: [
      {
        path: "communications",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../communication/communication.module").then(
                m => m.CommunicationPageModule
              )
          }
        ]
      },
      {
        path: "communication-details",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "../communication-details/communication-details.module"
              ).then(m => m.CommunicationDetailsPageModule)
          }
        ]
      },
      {
        path: "",
        redirectTo: "/querys/tabs/communications",
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuerysPageRoutingModule {}
