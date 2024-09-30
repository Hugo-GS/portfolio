import { Component, Input } from '@angular/core';
import { LabelTechnologyComponent, Technology } from "../label-technology/label-technology.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-project',
  standalone: true,
  imports: [LabelTechnologyComponent, CommonModule],
  templateUrl: './modal-project.component.html',
  styleUrl: './modal-project.component.css'
})
export class ModalProjectComponent {
  @Input() title: string = "";
  @Input() srcImgBg: string = "";
  @Input() hrefGitHubRepo: string = "";
  @Input() langs: Technology[] = [];
  @Input() libraries: Technology[] = [];
  @Input() frameworks: Technology[] = [];
  @Input() descriptionHTML: string = "";

}
