import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-containerbox-project',
  standalone: true,
  imports: [],
  templateUrl: './containerbox-project.component.html',
  styleUrl: './containerbox-project.component.css'
})
export class ContainerboxProjectComponent {
  @Input() title: string = "";
  @Input() shortDescription: string = "";
  @Input() imgSrc: string = "";

  @Input() technologies: string[] = [];
  @Input() langs: string[] = [];

}
