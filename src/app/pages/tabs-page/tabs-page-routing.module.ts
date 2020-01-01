import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs-page";
import { SchedulePage } from "../schedule/schedule";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "profile",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../profile/profile.module").then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: "fee",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../fee-details/fee-details.module").then(
                m => m.FeeDetailsPageModule
              )
          }
        ]
      },
      {
        path: "assessments",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../assessments/assessments.module").then(
                m => m.AssessmentsPageModule
              )
          }
        ]
      },
      {
        path: "",
        redirectTo: "/app/tabs/profile",
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
