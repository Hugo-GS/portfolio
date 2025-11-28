import { Component, Input } from '@angular/core';
import { LabelTechnologyComponent } from '../label-technology/label-technology.component';
import { Technology } from '../label-technology/enums/technology.enum';
import { CommonModule } from '@angular/common';
import { ModalProjectComponent } from '../modal-project/modal-project.component';

@Component({
  selector: 'app-containerbox-project',
  standalone: true,
  imports: [LabelTechnologyComponent, CommonModule, ModalProjectComponent],
  templateUrl: './containerbox-project.component.html',
  styleUrl: './containerbox-project.component.css'
})
export class ContainerboxProjectComponent {
  @Input() projectId: number = 0;
  @Input() title: string = "";
  @Input() shortDescription: string = "";
  @Input() imgSrc: string = "";
  @Input() technologies: Technology[] = [];
  @Input() langs: Technology[] = [];
  @Input() descriptionContent: string = "";
  @Input() hrefGitHubRepo?: string;
  @Input() demoURL?: string;
  @Input() projectURL?: string;

  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
