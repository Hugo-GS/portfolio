import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelTechnologyComponent } from './label-technology.component';

describe('LabelTechnologyComponent', () => {
  let component: LabelTechnologyComponent;
  let fixture: ComponentFixture<LabelTechnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelTechnologyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
