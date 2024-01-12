import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorSmsComponent } from './two-factor-sms.component';

describe('TwoFactorSmsComponent', () => {
  let component: TwoFactorSmsComponent;
  let fixture: ComponentFixture<TwoFactorSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoFactorSmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoFactorSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
