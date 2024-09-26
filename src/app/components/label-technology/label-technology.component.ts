import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export enum Technology {
  Angular = 'Angular',
  JavaScript = 'JavaScript',
  HTML5 = 'HTML5',
  Python = 'Python',
  NodeJS = 'NodeJS',
  Flask = 'Flask',
  Bottle = 'Bottle',
  FastAPI = 'FastAPI',
  Express = 'Express',
  TypeScript = 'TypeScript',
  Default = 'default'
}


@Component({
  selector: 'app-label-technology',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label-technology.component.html',
  styleUrl: './label-technology.component.css'
})
export class LabelTechnologyComponent {
  @Input() technology: Technology = Technology.Default;

  get technologyClass(): string {
    switch (this.technology) {
      case Technology.Angular:
        return 'label-technology-red';
      case Technology.JavaScript:
        return 'label-technology-yellow';
      case Technology.HTML5:
        return 'label-technology-orange';
      case Technology.Python:
        return 'label-technology-diff_blue';
      case Technology.NodeJS:
        return 'label-technology-green';
      case Technology.Flask:
        return 'label-technology-black';
      case Technology.Bottle:
        return 'label-technology-purple';
      case Technology.FastAPI:
        return 'label-technology-blue_aqua';
      case Technology.Express:
        return 'label-technology-grey';
      case Technology.TypeScript:
        return 'label-technology-lightblue';
      default:
        return '';
    }
  }
}
