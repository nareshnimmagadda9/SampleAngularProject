import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpPlaceorderComponent } from './bp-placeorder.component';

describe('BpPlaceorderComponent', () => {
  let component: BpPlaceorderComponent;
  let fixture: ComponentFixture<BpPlaceorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpPlaceorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpPlaceorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
