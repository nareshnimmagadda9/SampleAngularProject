import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBusinesspartnerComponent } from './update-businesspartner.component';

describe('UpdateBusinesspartnerComponent', () => {
  let component: UpdateBusinesspartnerComponent;
  let fixture: ComponentFixture<UpdateBusinesspartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBusinesspartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBusinesspartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
