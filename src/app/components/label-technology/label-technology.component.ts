import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Technology } from './enums/technology.enum';
import { TECHNOLOGY_ICONS } from './constants/technology-icons';

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
    const classMap = {
      [Technology.Angular]: 'label-technology-red',
      [Technology.JavaScript]: 'label-technology-yellow',
      [Technology.HTML5]: 'label-technology-orange',
      [Technology.Python]: 'label-technology-diff_blue',
      [Technology.NodeJS]: 'label-technology-green',
      [Technology.Flask]: 'label-technology-black',
      [Technology.Bottle]: 'label-technology-purple',
      [Technology.FastAPI]: 'label-technology-blue_aqua',
      [Technology.Express]: 'label-technology-grey',
      [Technology.TypeScript]: 'label-technology-lightblue',
      [Technology.Default]: 'label-technology-default'
    };

    return classMap[this.technology] || '';
  }

  getIconPath(): string {
    const icon = TECHNOLOGY_ICONS.find(i => i.name === this.technology);
    return icon?.path ?? '';
  }
}
