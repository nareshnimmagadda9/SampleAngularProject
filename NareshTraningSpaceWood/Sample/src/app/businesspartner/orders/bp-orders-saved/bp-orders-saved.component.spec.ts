import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpOrdersSavedComponent } from './bp-orders-saved.component';

describe('BpOrdersSavedComponent', () => {
  let component: BpOrdersSavedComponent;
  let fixture: ComponentFixture<BpOrdersSavedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpOrdersSavedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpOrdersSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
