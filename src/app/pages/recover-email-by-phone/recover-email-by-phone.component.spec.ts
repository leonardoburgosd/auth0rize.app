import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverEmailByPhoneComponent } from './recover-email-by-phone.component';

describe('RecoverEmailByPhoneComponent', () => {
  let component: RecoverEmailByPhoneComponent;
  let fixture: ComponentFixture<RecoverEmailByPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverEmailByPhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverEmailByPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
