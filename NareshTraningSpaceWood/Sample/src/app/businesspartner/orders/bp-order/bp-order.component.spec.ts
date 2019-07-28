import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpOrderComponent } from './bp-order.component';

describe('BpOrderComponent', () => {
  let component: BpOrderComponent;
  let fixture: ComponentFixture<BpOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
