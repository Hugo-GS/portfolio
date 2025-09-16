import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { LabelTechnologyComponent } from "../label-technology/label-technology.component";
import { Technology } from "../label-technology/enums/technology.enum";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-project',
  standalone: true,
  imports: [LabelTechnologyComponent, CommonModule],
  templateUrl: './modal-project.component.html',
  styleUrls: ['./modal-project.component.css']
})
export class ModalProjectComponent implements OnInit, OnDestroy {
  @Input() title: string = "";
  @Input() srcImgBg: string = "";
  @Input() hrefGitHubRepo: string = "";
  @Input() langs: Technology[] = [];
  @Input() libraries: Technology[] = [];
  @Input() frameworks: Technology[] = [];
  @Input() descriptionContent: string = "";
  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  closeModal() {
    this.close.emit();
  }
}

