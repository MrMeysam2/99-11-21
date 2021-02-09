import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParvandehComponent } from './parvandeh.component';

describe('ParvandehComponent', () => {
  let component: ParvandehComponent;
  let fixture: ComponentFixture<ParvandehComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParvandehComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParvandehComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
