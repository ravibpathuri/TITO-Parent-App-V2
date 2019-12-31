import { Injectable } from "@angular/core";

import { Api } from "../api/api";
import { Observable } from "rxjs";

@Injectable()
export class StudentSvcProvider {
  _user: any;

  constructor(public api: Api) {}

  getProfile() {
    let seq = this.api.get("profile").subscribe();

    return seq;
  }

  getMessages() {
    let seq = this.api.get("messages").subscribe();
    return seq;
  }

  getLatestMessages(time) {
    let input = { sTime: time };
    let seq = this.api.get("messages/after", input).subscribe();
    return seq;
  }

  getLatestMessagesCount(time) {
    let input = { sTime: time };
    let seq = this.api.get("messages/count/after", input).subscribe();
    return seq;
  }

  getAssessments() {
    let seq = this.api.get("assessments").subscribe();
    return seq;
  }

  getAssessmentDetail(assementId) {
    let seq = this.api.get("assessments/" + assementId).subscribe();
    return seq;
  }

  getAttendance() {
    let seq = this.api.get("attendance").subscribe();
    return seq;
  }

  getFeeDetails() {
    let seq = this.api.get("fee/details").subscribe();
    return seq;
  }

  getFeeTransactions() {
    let seq = this.api.get("fee/transactions").subscribe();
    return seq;
  }

  getVehicleDetails() {
    let seq = this.api.get("transport/details").subscribe();
    return seq;
  }

  getVehicleTracking() {
    let seq = this.api.get("transport/tracking").subscribe();
    return seq;
  }
  getNotifications() {
    let seq = this.api.get("Activities").subscribe();
    return seq;
  }

  getHomeTasks() {
    let seq = this.api.get("AllTasks").subscribe();
    return seq;
  }

  getSyllabus() {
    let seq = this.api.get("Syllabus").subscribe();
    return seq;
  }
  getHolidays() {
    let seq = this.api.get("Holidays").subscribe();
    return seq;
  }
  getDocument(RefId, documentId) {
    let seq = this.api.get("document/" + RefId + "/" + documentId).subscribe();
    return seq;
  }

  saveProfile(profile) {
    let req = this.api.post("profile", profile);
    //console.log(profile);
    return req;
  }
  changePassword(account) {
    let req = this.api.post("ResetPassword", account);
    //console.log(account);
    return req;
  }
  getImages() {
    let seq = this.api.get("eventImages").subscribe();
    return seq;
  }

  getNotificationTopics(): Observable<any> {
    let seq = this.api.get("PushNotificationsTopics");
    return seq;
  }

  addUser(user) {
    let req = this.api.post("login", user).subscribe();
    return req;
  }
  refreshToken(UUID) {
    let seq = this.api.get("document/" + UUID).subscribe();
    return seq;
  }

  CreateQuery(data) {
    let req = this.api.post("CreateParentQuery", data).subscribe();
    return req;
  }
  getRespondedQuerys() {
    let seq = this.api.get("GetRespondedQuerys").subscribe();
    return seq;
  }
  CreateFeedback(data) {
    let req = this.api.post("CreateFeedback", data).subscribe();
    return req;
  }
}
