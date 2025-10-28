import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationAccountComponent } from './verification-account.component';

describe('VerificationAccountComponent', () => {
  let component: VerificationAccountComponent;
  let fixture: ComponentFixture<VerificationAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificationAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
