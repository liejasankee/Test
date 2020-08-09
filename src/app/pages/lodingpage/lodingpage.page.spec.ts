import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LodingpagePage } from './lodingpage.page';

describe('LodingpagePage', () => {
  let component: LodingpagePage;
  let fixture: ComponentFixture<LodingpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LodingpagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LodingpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
