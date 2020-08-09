import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LastpagePage } from './lastpage.page';

describe('LastpagePage', () => {
  let component: LastpagePage;
  let fixture: ComponentFixture<LastpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastpagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LastpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
