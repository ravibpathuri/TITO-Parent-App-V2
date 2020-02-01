import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuerysPage } from './querys.page';

describe('QuerysPage', () => {
  let component: QuerysPage;
  let fixture: ComponentFixture<QuerysPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuerysPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuerysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
