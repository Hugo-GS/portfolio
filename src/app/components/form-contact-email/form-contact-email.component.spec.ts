import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContactEmailComponent } from './form-contact-email.component';

describe('FormContactEmailComponent', () => {
  let component: FormContactEmailComponent;
  let fixture: ComponentFixture<FormContactEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormContactEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormContactEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
