import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { StudentSvcProvider } from '../../providers/providers';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'daily-diary',
  templateUrl: './daily-diary.page.html',
  styleUrls: ['./daily-diary.page.scss'],
})
export class DailyDiaryPage implements OnInit {

  activities = [];

  searchTerm: string = '';
  searchControl: FormControl;
  item: any;

  searching: any = false;
  constructor(public navCtrl: NavController,
    public taskSvc: StudentSvcProvider,
    public toastCtrl: ToastController) {
    this.searchControl = new FormControl();
    this.loadActivities();
  }

  ngOnInit() {
    this.getHomeTask();
  }
  filterItems(searchTerm) {
    return this.activities.filter((item) => {
      //console.log(item);
      return (item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyDiaryPage');

    // this.activities.sort((a, b) => {
    //   if (new Date(a.ActivityDate).getTime() < new Date(b.ActivityDate).getTime()) return -1;
    //   else if (new Date(a.ActivityDate).getTime() > new Date(b.ActivityDate).getTime()) return 1;
    //   else return 0;
    // });
    this.getHomeTask();
    // this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
    //   this.searching = false;
    //   this.setFilteredItems();
    // });
  }
  doRefresh(refresher) {
    this.loadActivities(refresher);
  }

  onSearchInput() {
    this.searching = true;
  }
  setFilteredItems() {
    this.item = this.filterItems(this.searchTerm);
    // console.log(this.item);
  }
  loadActivities(refresher?: any) {
    if (refresher) {
      // complte fdresher
      refresher.complete();
    }
  }


  getHomeTask() {
    // Get Home Tasks
    let homeTaskReq = this.taskSvc.getHomeTasks();
    homeTaskReq.subscribe((result: any) => {
      this.activities = this.activities.concat(result);
    });
  }

}
