import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeeTransactionsPage } from './fee-transactions.page';

describe('FeeTransactionsPage', () => {
  let component: FeeTransactionsPage;
  let fixture: ComponentFixture<FeeTransactionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeTransactionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeeTransactionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
