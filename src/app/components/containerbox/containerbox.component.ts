import { Component, Input, OnChanges, SimpleChanges,
   ElementRef, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-containerbox',
  standalone: true,
  imports: [],
  templateUrl: './containerbox.component.html',
  styleUrl: './containerbox.component.css'
})
export class ContainerboxComponent {
  @Input() titleContainer: string = "Titulo";
  @Input() svgIconWindow: string = "";

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['svgIconWindow']) {
      const iconWindowElement = this.el.nativeElement.querySelector('.iconWindow');
      this.renderer.setProperty(iconWindowElement, 'innerHTML', this.svgIconWindow);
    }
  }


}
