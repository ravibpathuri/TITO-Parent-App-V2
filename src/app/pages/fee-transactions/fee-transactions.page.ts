import { Component, OnInit } from '@angular/core';
import {NavController,ToastController, LoadingController } from '@ionic/angular';
import { StudentSvcProvider } from '../../providers/providers';
@Component({
  selector: 'fee-transactions',
  templateUrl: './fee-transactions.page.html',
  styleUrls: ['./fee-transactions.page.scss'],
})
export class FeeTransactionsPage implements OnInit {

  feeTransactions = []
  constructor(
    public navCtrl: NavController,    
    public loadingController: LoadingController,
    public toastCtrl: ToastController,
    public feeSvc: StudentSvcProvider) {
  }

  ngOnInit() {
    let req = this.feeSvc.getFeeTransactions();

    req.subscribe((result: any) => {
      this.feeTransactions = result;
      //console.log(this.feeTransactions);    
  })
}
downloandInvoice(inv)
{
  alert("downloading is comingsoon.....")  }

}
