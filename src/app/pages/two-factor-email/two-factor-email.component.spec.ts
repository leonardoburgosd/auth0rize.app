import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorEmailComponent } from './two-factor-email.component';

describe('TwoFactorEmailComponent', () => {
  let component: TwoFactorEmailComponent;
  let fixture: ComponentFixture<TwoFactorEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoFactorEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoFactorEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
