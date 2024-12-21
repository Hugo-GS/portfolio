import { Component, HostListener, OnInit } from "@angular/core";
import { NavbarTopComponent } from "./components/navbar-top/navbar-top.component";
import { ContainerboxComponent } from "./components/containerbox/containerbox.component";
import { FormContactEmailComponent } from "./components/form-contact-email/form-contact-email.component";
import { ContainerboxProjectComponent } from "./components/containerbox-project/containerbox-project.component";
import { FooterContactComponent } from "./components/footer-contact/footer-contact.component";
import { DonutAnimationComponent } from "./components/donut-animation/donut-animation.component";
import { Section } from './models/section.interface';
import { Project } from './models/project.interface';
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    NavbarTopComponent,
    ContainerboxComponent,
    FormContactEmailComponent,
    ContainerboxProjectComponent,
    FooterContactComponent,
    DonutAnimationComponent
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  readonly title = "Portfolio";

  readonly sections: Section[] = [
    { id: 'hero', name: 'Inicio' },
    { id: 'projects', name: 'Proyectos' },
    { id: 'contact', name: 'Contáctame' }
  ];

  readonly titleContainerHero = "";

  readonly svgIcon = /*html*/`
    <svg xmlns="http://www.w3.org/2000/svg"
      width="24" height="24"
      viewBox="0 0 24 24"
      style="fill: rgba(255, 255, 255, 1);">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM6.414 15.707 L5 14.293 7.293 12 5 9.707l1.414-1.414L10.121 12l-3.707 3.707zM19 16h-7v-2h7v2z">
      </path>
    </svg>
  `;

  projects: Project[] = [
    {
      title: 'Compilador de graficos UML',
      shortDescription: '',
      imgSrc: 'img/imgpj_1.png'
    },
    {
      title: 'Gestor de Inventarios',
      shortDescription: '',
      imgSrc: 'img/imgpj_2.png'
    },
    {
      title: 'Generador TOML Users',
      shortDescription: '',
      imgSrc: 'img/imgpj_2.png'
    },
    {
      title: 'Lenguajes & Frameworks API',
      shortDescription: '',
      imgSrc: 'img/imgpj_1.png'
    }
  ];

  activeSection: string = 'hero';

  private readonly SCROLL_OFFSET = 120;

  ngOnInit(): void {
    this.onScroll();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.scrollY;
    this.activeSection = this.getActiveSection(scrollPosition);
  }

  private getActiveSection(scrollPosition: number): string {
    try {
      const activeSection = this.sections.find(section => {
        const element = document.getElementById(section.id);
        if (!element) return false;

        const { offsetTop, offsetHeight } = element;
        return scrollPosition + this.SCROLL_OFFSET >= offsetTop &&
               scrollPosition < offsetTop + offsetHeight;
      });

      return activeSection?.id ?? this.activeSection;
    } catch (error) {
      console.error('Error al determinar la sección activa:', error);
      return this.activeSection;
    }
  }
}
