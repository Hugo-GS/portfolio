import { Component, HostListener, OnInit } from "@angular/core";
import { NavbarTopComponent } from "./components/navbar-top/navbar-top.component";
import { ContainerboxComponent } from "./components/containerbox/containerbox.component";
import { FormContactEmailComponent } from "./components/form-contact-email/form-contact-email.component";
import { ContainerboxProjectComponent } from "./components/containerbox-project/containerbox-project.component";
import { FooterContactComponent } from "./components/footer-contact/footer-contact.component";
import { DonutAnimationComponent } from "./components/donut-animation/donut-animation.component";
import { Section } from './models/section.interface';
import { Project, ProjectJSON } from './models/project.interface';
import { CommonModule } from "@angular/common";
import { Technology } from "./components/label-technology/enums/technology.enum";

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

  projects: Project[] = [];
  activeSection: string = 'hero';
  private readonly SCROLL_OFFSET_PERCENTAGE = 0.15; // 15% of viewport height

  ngOnInit(): void {
    this.loadProjects();
    this.onScroll();
  }

  private stringToTechnology(tech: string): Technology {
    return Technology[tech as keyof typeof Technology] || Technology.Default;
  }

  private mapJSONToProject(jsonProject: ProjectJSON): Project {
    return {
      title: jsonProject.Title,
      imgSrc: jsonProject.ImgSrc || 'img/imgpj_1.png',
      langs: jsonProject.Langs.map(lang => this.stringToTechnology(lang)),
      frameworks: jsonProject.Frameworks.map(framework => this.stringToTechnology(framework)),
      libraries: jsonProject.Libraries.map(library => this.stringToTechnology(library)),
      descriptionContent: jsonProject.DescripcionContent,
      shortDescription: ''
    };
  }

  getCombinedTechnologies(project: Project): Technology[] {
    return [...project.frameworks, ...project.libraries];
  }

  async loadProjects() {
    try {
      const response = await fetch('/files_data_projects/data_projects.json');
      if (!response.ok) {
        throw new Error('No se pudo cargar el archivo JSON');
      }
      const projectsJSON: ProjectJSON[] = await response.json();
      this.projects = projectsJSON.map(project => this.mapJSONToProject(project));
    } catch (error) {
      console.error('Error al cargar los proyectos:', error);
      // Proyecto por defecto en caso de error
      this.projects = [{
        title: 'Compilador de graficos UML',
        shortDescription: '',
        imgSrc: 'img/imgpj_1.png',
        langs: [],
        frameworks: [],
        libraries: [],
        descriptionContent: ''
      }];
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.scrollY;
    this.activeSection = this.getActiveSection(scrollPosition);
  }

  private getActiveSection(scrollPosition: number): string {
    try {
      const viewportHeight = window.innerHeight;
      const dynamicOffset = viewportHeight * this.SCROLL_OFFSET_PERCENTAGE;

      for (const section of this.sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;

        if (
          (scrollPosition + dynamicOffset >= elementTop && scrollPosition + dynamicOffset < elementBottom) ||
          (section.id === 'hero' && scrollPosition < elementTop) ||
          (section.id === 'contact' && scrollPosition + viewportHeight >= document.documentElement.scrollHeight - 50)
        ) {
          return section.id;
        }
      }

      return this.activeSection;
    } catch (error) {
      console.error('Error al determinar la sección activa:', error);
      return this.activeSection;
    }
  }

  scrollToProjects() {
    const section = document.getElementById('projects');
    if (section) {
      const offset = 80;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: sectionTop, behavior: 'smooth' });
    }
  }
}
