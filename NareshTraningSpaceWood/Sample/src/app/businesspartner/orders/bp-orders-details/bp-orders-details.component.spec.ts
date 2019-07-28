import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpOrdersDetailsComponent } from './bp-orders-details.component';

describe('BpOrdersDetailsComponent', () => {
  let component: BpOrdersDetailsComponent;
  let fixture: ComponentFixture<BpOrdersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpOrdersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpOrdersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
