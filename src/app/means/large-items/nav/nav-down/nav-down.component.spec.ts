import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDownComponent } from './nav-down.component';

describe('NavDownComponent', () => {
  let component: NavDownComponent;
  let fixture: ComponentFixture<NavDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavDownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
