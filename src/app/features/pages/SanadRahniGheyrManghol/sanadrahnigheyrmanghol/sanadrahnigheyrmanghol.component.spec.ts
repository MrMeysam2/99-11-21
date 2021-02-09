import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanadrahnigheyrmangholComponent } from './sanadrahnigheyrmanghol.component';

describe('SanadrahnigheyrmangholComponent', () => {
  let component: SanadrahnigheyrmangholComponent;
  let fixture: ComponentFixture<SanadrahnigheyrmangholComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanadrahnigheyrmangholComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanadrahnigheyrmangholComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
