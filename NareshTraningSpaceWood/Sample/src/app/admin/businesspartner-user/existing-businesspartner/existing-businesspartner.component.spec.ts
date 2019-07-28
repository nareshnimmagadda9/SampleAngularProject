import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingBusinesspartnerComponent } from './existing-businesspartner.component';

describe('ExistingBusinesspartnerComponent', () => {
  let component: ExistingBusinesspartnerComponent;
  let fixture: ComponentFixture<ExistingBusinesspartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingBusinesspartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingBusinesspartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
