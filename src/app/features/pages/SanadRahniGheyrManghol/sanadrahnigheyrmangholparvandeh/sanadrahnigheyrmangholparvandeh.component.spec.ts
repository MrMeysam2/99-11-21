import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanadrahnigheyrmangholparvandehComponent } from './sanadrahnigheyrmangholparvandeh.component';

describe('SanadrahnigheyrmangholparvandehComponent', () => {
  let component: SanadrahnigheyrmangholparvandehComponent;
  let fixture: ComponentFixture<SanadrahnigheyrmangholparvandehComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanadrahnigheyrmangholparvandehComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanadrahnigheyrmangholparvandehComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
