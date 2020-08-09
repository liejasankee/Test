import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MailformComponent } from './mailform.component';

describe('MailformComponent', () => {
  let component: MailformComponent;
  let fixture: ComponentFixture<MailformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailformComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MailformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
