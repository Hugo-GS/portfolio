import { Component, Input, OnChanges, SimpleChanges, OnInit,
  ElementRef, Renderer2, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

@Component({
  selector: 'app-containerbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './containerbox.component.html',
  styleUrl: './containerbox.component.css'
})
export class ContainerboxComponent implements OnInit, OnChanges {
  @Input() titleContainer: string = "user@linux: ~";
  @Input() svgIconWindow: string = "";

  position: Position = { x: 0, y: 0 };
  isDragging = false;
  dragOffset: Position = { x: 0, y: 0 };
  isMinimized = false;
  isMaximized = false;
  isOpen = true;

  size: Size = { width: 950, height: 550 };

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    setTimeout(() => {
      this.centerWindow();
      this.updateWindowPosition();
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['svgIconWindow']) {
      const iconWindowElement = this.el.nativeElement.querySelector('.iconWindow');
      this.renderer.setProperty(iconWindowElement, 'innerHTML', this.svgIconWindow);
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (!this.isDragging && !this.isMaximized) {
      this.centerWindow();
      this.updateWindowPosition();
    }
  }

  centerWindow() {
    if (typeof window !== 'undefined') {
      const availableHeight = window.innerHeight - 64;
      const x = Math.max(0, (window.innerWidth - this.size.width) / 2);
      const y = Math.max(64, 64 + (availableHeight - this.size.height) / 2);
      this.position = { x, y };
    }
  }

  updateWindowPosition() {
    const windowElement = this.el.nativeElement.querySelector('.window');
    if (windowElement) {
      if (this.isMaximized) {
        this.renderer.setStyle(windowElement, 'top', '64px');
        this.renderer.setStyle(windowElement, 'left', '0');
        this.renderer.setStyle(windowElement, 'width', '100%');
        this.renderer.setStyle(windowElement, 'height', 'calc(100vh - 64px)');
        this.renderer.setStyle(windowElement, 'transition', 'all 0.3s ease-in-out');
      } else {
        this.renderer.setStyle(windowElement, 'top', `${this.position.y}px`);
        this.renderer.setStyle(windowElement, 'left', `${this.position.x}px`);
        this.renderer.setStyle(windowElement, 'width', `${this.size.width}px`);
        this.renderer.setStyle(windowElement, 'height', `${this.size.height}px`);
        this.renderer.setStyle(windowElement, 'transition',
          this.isDragging ? 'none' : 'top 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
        );
      }
    }
  }

  onMouseDown(event: MouseEvent) {
    if (this.isMaximized) return;

    event.preventDefault();
    this.isDragging = true;

    const windowElement = this.el.nativeElement.querySelector('.window');
    if (windowElement) {
      const rect = windowElement.getBoundingClientRect();
      this.dragOffset = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }

    this.renderer.addClass(document.body, 'dragging');
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging && !this.isMaximized) {
      this.position = {
        x: event.clientX - this.dragOffset.x,
        y: event.clientY - this.dragOffset.y
      };
      this.updateWindowPosition();
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
      this.renderer.removeClass(document.body, 'dragging');

      // Elastic snap back to center
      if (!this.isMaximized) {
        setTimeout(() => {
          this.centerWindow();
          this.updateWindowPosition();
        }, 100);
      }
    }
  }

  onMinimize() {
    this.isMinimized = !this.isMinimized;
  }

  onMaximize() {
    this.isMaximized = !this.isMaximized;
    this.updateWindowPosition();
  }

  onClose() {
    this.isOpen = false;
  }
}
