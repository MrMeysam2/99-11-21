import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakhshoghooghiComponent } from './shakhshoghooghi.component';

describe('ShakhshoghooghiComponent', () => {
  let component: ShakhshoghooghiComponent;
  let fixture: ComponentFixture<ShakhshoghooghiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShakhshoghooghiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakhshoghooghiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
