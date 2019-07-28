import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesspartnerUserComponent } from './businesspartner-user.component';

describe('BusinesspartnerUserComponent', () => {
  let component: BusinesspartnerUserComponent;
  let fixture: ComponentFixture<BusinesspartnerUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinesspartnerUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinesspartnerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
