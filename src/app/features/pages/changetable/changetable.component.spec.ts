import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangetableComponent } from './changetable.component';

describe('ChangetableComponent', () => {
  let component: ChangetableComponent;
  let fixture: ComponentFixture<ChangetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangetableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
