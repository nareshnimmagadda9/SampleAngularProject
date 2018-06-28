import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcreationComponent } from './productcreation.component';

describe('ProductcreationComponent', () => {
  let component: ProductcreationComponent;
  let fixture: ComponentFixture<ProductcreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductcreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
