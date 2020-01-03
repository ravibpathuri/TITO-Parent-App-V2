import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeesPage } from './fees.page';

describe('FeesPage', () => {
  let component: FeesPage;
  let fixture: ComponentFixture<FeesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
