import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpNeworderComponent } from './bp-neworder.component';

describe('BpNeworderComponent', () => {
  let component: BpNeworderComponent;
  let fixture: ComponentFixture<BpNeworderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpNeworderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpNeworderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
