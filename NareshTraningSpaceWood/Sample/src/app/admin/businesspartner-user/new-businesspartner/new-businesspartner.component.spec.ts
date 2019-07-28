import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBusinesspartnerComponent } from './new-businesspartner.component';

describe('NewBusinesspartnerComponent', () => {
  let component: NewBusinesspartnerComponent;
  let fixture: ComponentFixture<NewBusinesspartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBusinesspartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBusinesspartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
