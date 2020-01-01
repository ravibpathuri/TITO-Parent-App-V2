import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/users-list",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then(m => m.LoginModule)
  },
  {
    path: "app",
    loadChildren: () =>
      import("./pages/tabs-page/tabs-page.module").then(m => m.TabsModule)
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./pages/profile/profile.module").then(m => m.ProfilePageModule)
  },
  {
    path: "fee-details",
    loadChildren: () =>
      import("./pages/fee-details/fee-details.module").then(
        m => m.FeeDetailsPageModule
      )
  },
  {
    path: "assessments",
    loadChildren: () =>
      import("./pages/assessments/assessments.module").then(
        m => m.AssessmentsPageModule
      )
  },
  {
    path: "users-list",
    loadChildren: () =>
      import("./pages/users-list/users-list.module").then(
        m => m.UsersListPageModule
      )
  },
  {
    path: "add-student",
    loadChildren: () =>
      import("./pages/add-student/add-student.module").then(
        m => m.AddStudentPageModule
      )
  },
  {
    path: "messages",
    loadChildren: () =>
      import("./pages/messages/messages.module").then(m => m.MessagesPageModule)
  },
  {
    path: "daily-diary",
    loadChildren: () =>
      import("./pages/daily-diary/daily-diary.module").then(
        m => m.DailyDiaryPageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
