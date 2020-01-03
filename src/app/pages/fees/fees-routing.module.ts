import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FeesPage } from "./fees.page";

const routes: Routes = [
  {
    path: "tabs",
    component: FeesPage,
    children: [
      {
        path: "fee-details",
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
        path: "fee-transactions",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../fee-transactions/fee-transactions.module").then(
                m => m.FeeTransactionsPageModule
              )
          }
        ]
      },
      {
        path: "",
        redirectTo: "/fees/tabs/fee-details",
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesPageRoutingModule {}
