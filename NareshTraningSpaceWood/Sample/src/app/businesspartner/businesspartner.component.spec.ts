import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesspartnerComponent } from './businesspartner.component';

describe('BusinesspartnerComponent', () => {
  let component: BusinesspartnerComponent;
  let fixture: ComponentFixture<BusinesspartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinesspartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinesspartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
