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
  },
  {
    path: "notifications",
    loadChildren: () =>
      import("./pages/notifications/notifications.module").then(
        m => m.NotificationsPageModule
      )
  },
  {
    path: "syllabus",
    loadChildren: () =>
      import("./pages/syllabus/syllabus.module").then(m => m.SyllabusPageModule)
  },
  {
    path: "fee-details",
    loadChildren: () =>
      import("./pages/fee-details/fee-details.module").then(
        m => m.FeeDetailsPageModule
      )
  },
  {
    path: "fee-transactions",
    loadChildren: () =>
      import("./pages/fee-transactions/fee-transactions.module").then(
        m => m.FeeTransactionsPageModule
      )
  },
  {
    path: "attendance",
    loadChildren: () =>
      import("./pages/attendance/attendance.module").then(
        m => m.AttendancePageModule
      )
  },
  {
    path: "holidays",
    loadChildren: () =>
      import("./pages/holidays/holidays.module").then(m => m.HolidaysPageModule)
  },
  {
    path: "assessments",
    loadChildren: () =>
      import("./pages/assessments/assessments.module").then(
        m => m.AssessmentsPageModule
      )
  },
  {
    path: "assessment-details/:assessmentId",
    loadChildren: () =>
      import("./pages/assessment-details/assessment-details.module").then(
        m => m.AssessmentDetailsPageModule
      )
  },
  {
    path: "transport-details",
    loadChildren: () =>
      import("./pages/transport-details/transport-details.module").then(
        m => m.TransportDetailsPageModule
      )
  },
  {
    path: "transport-tracking",
    loadChildren: () =>
      import("./pages/transport-tracking/transport-tracking.module").then(
        m => m.TransportTrackingPageModule
      )
  },
  {
    path: "photos",
    loadChildren: () =>
      import("./pages/photos/photos.module").then(m => m.PhotosPageModule)
  },
  {
    path: "reset-password",
    loadChildren: () =>
      import("./pages/reset-password/reset-password.module").then(
        m => m.ResetPasswordPageModule
      )
  },
  {
    path: "fees",
    loadChildren: () =>
      import("./pages/fees/fees.module").then(m => m.FeesPageModule)
  },  {
    path: 'communication',
    loadChildren: () => import('./pages/communication/communication.module').then( m => m.CommunicationPageModule)
  },
  {
    path: 'communication-details',
    loadChildren: () => import('./pages/communication-details/communication-details.module').then( m => m.CommunicationDetailsPageModule)
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./pages/profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
  },
  {
    path: 'time-table',
    loadChildren: () => import('./pages/time-table/time-table.module').then( m => m.TimeTablePageModule)
  },
  {
    path: 'querys',
    loadChildren: () => import('./pages/querys/querys.module').then( m => m.QuerysPageModule)
  },
  {
    path: 'fee-online-payment',
    loadChildren: () => import('./pages/fee-online-payment/fee-online-payment.module').then( m => m.FeeOnlinePaymentPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
