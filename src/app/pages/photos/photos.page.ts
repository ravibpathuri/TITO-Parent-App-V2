import { Component, OnInit } from '@angular/core';
import {NavController } from '@ionic/angular';
import { StudentSvcProvider } from '../../providers/providers';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {

  data: any;

  constructor(public navCtrl: NavController,
    public imgsrc: StudentSvcProvider,
    private sanitizer: DomSanitizer) {
  }


  ngOnInit() {
    let req = this.imgsrc.getImages();

    req.subscribe((result: any) => {
      this.data = result;
      //console.log(this.data);
    });
  }

}
