import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutAnimationComponent } from './donut-animation.component';

describe('DonutAnimationComponent', () => {
  let component: DonutAnimationComponent;
  let fixture: ComponentFixture<DonutAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonutAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonutAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
