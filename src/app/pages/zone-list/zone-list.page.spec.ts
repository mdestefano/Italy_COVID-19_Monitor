import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ZoneListPage } from './zone-list.page';

describe('ZoneListPage', () => {
  let component: ZoneListPage;
  let fixture: ComponentFixture<ZoneListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ZoneListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
