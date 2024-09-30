import { Component, Input } from '@angular/core';
import { LabelTechnologyComponent, Technology } from '../label-technology/label-technology.component';
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
  @Input() technologies: Technology[] = [Technology.Angular]; // Ejemplo luego borrar
  @Input() langs: Technology[] = [Technology.JavaScript]; // Ejemplo luego borrar

  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }
}
