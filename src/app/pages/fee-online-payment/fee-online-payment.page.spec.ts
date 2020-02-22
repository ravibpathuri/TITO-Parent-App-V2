import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeeOnlinePaymentPage } from './fee-online-payment.page';

describe('FeeOnlinePaymentPage', () => {
  let component: FeeOnlinePaymentPage;
  let fixture: ComponentFixture<FeeOnlinePaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeOnlinePaymentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeeOnlinePaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
