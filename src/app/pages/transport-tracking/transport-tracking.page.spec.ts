import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransportTrackingPage } from './transport-tracking.page';

describe('TransportTrackingPage', () => {
  let component: TransportTrackingPage;
  let fixture: ComponentFixture<TransportTrackingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportTrackingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransportTrackingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
