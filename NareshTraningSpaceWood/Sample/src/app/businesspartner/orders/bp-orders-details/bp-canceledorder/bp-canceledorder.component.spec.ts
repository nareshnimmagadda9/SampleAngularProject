import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpCanceledorderComponent } from './bp-canceledorder.component';

describe('BpCanceledorderComponent', () => {
  let component: BpCanceledorderComponent;
  let fixture: ComponentFixture<BpCanceledorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpCanceledorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpCanceledorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
