import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpSuccessorderComponent } from './bp-successorder.component';

describe('BpSuccessorderComponent', () => {
  let component: BpSuccessorderComponent;
  let fixture: ComponentFixture<BpSuccessorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpSuccessorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpSuccessorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
