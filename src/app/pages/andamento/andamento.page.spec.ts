import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AndamentoPage } from './andamento.page';

describe('AndamentoPage', () => {
  let component: AndamentoPage;
  let fixture: ComponentFixture<AndamentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndamentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AndamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
