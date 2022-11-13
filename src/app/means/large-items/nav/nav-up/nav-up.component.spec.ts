import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavUpComponent } from './nav-up.component';

describe('NavUpComponent', () => {
  let component: NavUpComponent;
  let fixture: ComponentFixture<NavUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
