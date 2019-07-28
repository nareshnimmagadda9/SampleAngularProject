import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBpordersComponent } from './upload-bporders.component';

describe('UploadBpordersComponent', () => {
  let component: UploadBpordersComponent;
  let fixture: ComponentFixture<UploadBpordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadBpordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBpordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
