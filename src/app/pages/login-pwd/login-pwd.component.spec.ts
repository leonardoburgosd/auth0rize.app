import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPwdComponent } from './login-pwd.component';

describe('LoginPwdComponent', () => {
  let component: LoginPwdComponent;
  let fixture: ComponentFixture<LoginPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPwdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
