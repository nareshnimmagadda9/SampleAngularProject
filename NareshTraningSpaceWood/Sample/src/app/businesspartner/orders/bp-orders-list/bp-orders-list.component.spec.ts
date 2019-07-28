import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpOrdersListComponent } from './bp-orders-list.component';

describe('BpOrdersListComponent', () => {
  let component: BpOrdersListComponent;
  let fixture: ComponentFixture<BpOrdersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpOrdersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
