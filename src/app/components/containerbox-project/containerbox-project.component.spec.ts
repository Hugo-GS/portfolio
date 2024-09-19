import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerboxProjectComponent } from './containerbox-project.component';

describe('ContainerboxProjectComponent', () => {
  let component: ContainerboxProjectComponent;
  let fixture: ComponentFixture<ContainerboxProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerboxProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerboxProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
