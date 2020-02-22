import { Injectable } from "@angular/core";

import { Api } from "../api/api";
import { Observable } from "rxjs";

@Injectable()
export class StudentSvcProvider {
  _user: any;

  constructor(public api: Api) {}

  getProfile() {
    let seq = this.api.get("profile");

    return seq;
  }

  getMessages() {
    let seq = this.api.get("messages");
    return seq;
  }

  getLatestMessages(time) {
    let input = { sTime: time };
    let seq = this.api.get("messages/after", input);
    return seq;
  }

  getLatestMessagesCount(time) {
    let input = { sTime: time };
    let seq = this.api.get("messages/count/after", input);
    return seq;
  }

  getAssessments() {
    let seq = this.api.get("assessments");
    return seq;
  }

  getAssessmentDetail(assementId) {
    let seq = this.api.get("assessments/" + assementId);
    return seq;
  }

  getAttendance() {
    let seq = this.api.get("attendance");
    return seq;
  }

  getFeeDetails() {
    let seq = this.api.get("fee/details");
    return seq;
  }

  getFeeTransactions() {
    let seq = this.api.get("fee/transactions");
    return seq;
  }

  getVehicleDetails() {
    let seq = this.api.get("transport/details");
    return seq;
  }

  getVehicleTracking() {
    let seq = this.api.get("transport/tracking");
    return seq;
  }
  getNotifications() {
    let seq = this.api.get("Activities");
    return seq;
  }

  getHomeTasks() {
    let seq = this.api.get("AllTasks");
    return seq;
  }

  getSyllabus() {
    let seq = this.api.get("Syllabus");
    return seq;
  }
  getHolidays() {
    let seq = this.api.get("Holidays");
    return seq;
  }
  getDocument(RefId, documentId) {
    let seq = this.api.get("document/" + RefId + "/" + documentId);
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
    let seq = this.api.get("eventImages");
    return seq;
  }

  getNotificationTopics(): Observable<any> {
    let seq = this.api.get("PushNotificationsTopics");
    return seq;
  }

  addUser(user) {
    let req = this.api.post("login", user);
    return req;
  }
  refreshToken(UUID) {
    let seq = this.api.get("document/" + UUID);
    return seq;
  }

  CreateQuery(data) {
    let req = this.api.post("CreateParentQuery", data);
    return req;
  }
  getRespondedQuerys() {
    let seq = this.api.get("GetRespondedQuerys");
    return seq;
  }
  CreateFeedback(data) {
    let req = this.api.post("CreateFeedback", data);
    return req;
  }
  getTimeTable() {
    let seq = this.api.get("getTimeTable");
    return seq;
  }

  createRazorpayOrder(data) {
    let seq = this.api.post("CreateRazorpayOrder", data);
    return seq;
  }
}
