import { CommonModule } from '@angular/common';
import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-top.component.html',
  styleUrl: './navbar-top.component.css'
})
export class NavbarTopComponent implements OnInit {

  @Input() activeSection: string = 'hero';
  currentTime: string = "";

  scrollTo(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 60;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: sectionTop, behavior: 'smooth' });
    }
  }

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 60000);
  }

  updateTime() {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('es-ES', { month: 'short' });
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.currentTime = `${day} de ${month} ${hours}:${minutes}`;
  }

}
