import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakhshoghooghiaddressComponent } from './shakhshoghooghiaddress.component';

describe('ShakhshoghooghiaddressComponent', () => {
  let component: ShakhshoghooghiaddressComponent;
  let fixture: ComponentFixture<ShakhshoghooghiaddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShakhshoghooghiaddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakhshoghooghiaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
