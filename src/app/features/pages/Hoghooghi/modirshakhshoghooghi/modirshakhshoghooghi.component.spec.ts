import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModirshakhshoghooghiComponent } from './modirshakhshoghooghi.component';

describe('ModirshakhshoghooghiComponent', () => {
  let component: ModirshakhshoghooghiComponent;
  let fixture: ComponentFixture<ModirshakhshoghooghiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModirshakhshoghooghiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModirshakhshoghooghiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
