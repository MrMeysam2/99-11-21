import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakhshaghighiaddressComponent } from './shakhshaghighiaddress.component';

describe('ShakhshaghighiaddressComponent', () => {
  let component: ShakhshaghighiaddressComponent;
  let fixture: ComponentFixture<ShakhshaghighiaddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShakhshaghighiaddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakhshaghighiaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
