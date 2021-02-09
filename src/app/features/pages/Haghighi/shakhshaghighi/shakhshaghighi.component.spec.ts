import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakhshaghighiComponent } from './shakhshaghighi.component';

describe('ShakhshaghighiComponent', () => {
  let component: ShakhshaghighiComponent;
  let fixture: ComponentFixture<ShakhshaghighiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShakhshaghighiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakhshaghighiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
