import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangetablehoghooghiComponent } from './changetablehoghooghi.component';

describe('ChangetablehoghooghiComponent', () => {
  let component: ChangetablehoghooghiComponent;
  let fixture: ComponentFixture<ChangetablehoghooghiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangetablehoghooghiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangetablehoghooghiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
