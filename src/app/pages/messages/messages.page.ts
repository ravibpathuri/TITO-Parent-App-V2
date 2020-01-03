import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { StudentSvcProvider } from "../../providers/providers";
import { FormControl } from "@angular/forms";

@Component({
  selector: "messages",
  templateUrl: "./messages.page.html",
  styleUrls: ["./messages.page.scss"]
})
export class MessagesPage implements OnInit {
  messages = [];
  filterdMessages = [];

  searchTerm: string = "";
  searchControl: FormControl;
  todayDate = new Date().toJSON();
  item: any;
  searching: any = false;

  STORED_MESSAGES = "_messages";
  STORED_MESSAGES_TIMESTAMP = "_lastMessageTimestamp";

  constructor(private msgSvc: StudentSvcProvider, public storage: Storage) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {}

  onSearchInput() {
    this.searching = true;
  }

  ionViewWillEnter() {
    this.loadMessages();

    this.searchControl.valueChanges.subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
    });
  }

  doRefresh(refresher) {
    this.loadMessages(refresher);
  }

  loadMessages(refresher?: any) {
    this.storage.get(this.STORED_MESSAGES_TIMESTAMP).then((datetime: any) => {
      this.setFilteredItems();

      // if time stamp is available
      if (datetime) {
        //then, look for new messages in backend
        let req = this.msgSvc.getLatestMessages(datetime);
        //console.log(datetime);
        req.subscribe((result: any) => {
          if (result) {
            this.messages = this.messages.concat(result);
            //console.log(result);
            this.saveMessages(this.messages);
            this.setFilteredItems();
          }
        });
      } else {
        // else, get all messages
        this.messages = [];
        let req = this.msgSvc.getMessages();
        req.subscribe((result: any) => {
          if (result) {
            //console.log(result);
            this.messages = this.messages.concat(result);
            this.saveMessages(this.messages);
            this.setFilteredItems();
          }
        });
      }
    });

    if (refresher) {
      // complte fdresher
      refresher.detail.complete();
    }
  }

  saveMessages(res) {
    let storedMessages = [];
    storedMessages = storedMessages.concat(res);
    this.storage.set(this.STORED_MESSAGES, JSON.stringify(storedMessages));
    //console.log(storedMessages);
    this.storage.set(
      this.STORED_MESSAGES_TIMESTAMP,
      this.getLatestMessageTimestamp(storedMessages)
    );
  }

  getLatestMessageTimestamp(msgs) {
    if (msgs && msgs.length > 0) {
      let sortedmessages = msgs.sort(
        (a: any, b: any) =>
          (new Date(a.date).getTime() - new Date(b.date).getTime()) * -1
      );
      //console.log(msgs);
      return sortedmessages[0].date;
    } else return "";
  }

  setFilteredItems() {
    this.filterdMessages = this.filterItems(this.searchTerm);
  }

  filterItems(searchTerm) {
    return this.messages.filter(item => {
      return (
        item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }
}
