import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangetablehaghighiComponent } from './changetablehaghighi.component';

describe('ChangetablehaghighiComponent', () => {
  let component: ChangetablehaghighiComponent;
  let fixture: ComponentFixture<ChangetablehaghighiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangetablehaghighiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangetablehaghighiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
