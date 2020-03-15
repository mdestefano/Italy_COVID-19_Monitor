import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DisplayDataPage } from './display-data.page';

describe('DisplayDataPage', () => {
  let component: DisplayDataPage;
  let fixture: ComponentFixture<DisplayDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
