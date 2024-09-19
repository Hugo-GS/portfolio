import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerboxComponent } from './containerbox.component';

describe('ContainerboxComponent', () => {
  let component: ContainerboxComponent;
  let fixture: ComponentFixture<ContainerboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
