import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSecLeftComponent } from './nav-sec-left.component';

describe('NavSecLeftComponent', () => {
  let component: NavSecLeftComponent;
  let fixture: ComponentFixture<NavSecLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavSecLeftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavSecLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
