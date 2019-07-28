import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpBalanceComponent } from './bp-balance.component';

describe('BpBalanceComponent', () => {
  let component: BpBalanceComponent;
  let fixture: ComponentFixture<BpBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
