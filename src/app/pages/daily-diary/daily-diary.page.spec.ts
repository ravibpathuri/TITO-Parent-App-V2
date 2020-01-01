import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyDiaryPage } from './daily-diary.page';

describe('DailyDiaryPage', () => {
  let component: DailyDiaryPage;
  let fixture: ComponentFixture<DailyDiaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyDiaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyDiaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
