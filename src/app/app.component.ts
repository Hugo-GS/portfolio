import { Component, HostListener } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarTopComponent } from "./components/navbar-top/navbar-top.component";
import { ContainerboxComponent } from "./components/containerbox/containerbox.component";
import { FormContactEmailComponent } from "./components/form-contact-email/form-contact-email.component";
import { ContainerboxProjectComponent } from "./components/containerbox-project/containerbox-project.component";
import { FooterContactComponent } from "./components/footer-contact/footer-contact.component";
import { DonutAnimationComponent } from "./components/donut-animation/donut-animation.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
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
export class AppComponent {
  title = "Portfolio";
  sections: any[] = [
    { id: 'hero', name: 'Inicio' },
    { id: 'projects', name: 'Proyectos' },
    { id: 'contact', name: 'Contáctame' }
  ];


  titleContainerHero = "";

  svgIcon = /*html*/`
    <svg xmlns="http://www.w3.org/2000/svg"
      width="24" height="24"
      viewBox="0 0 24 24"
      style="fill: rgba(255, 255, 255, 1);
      transform: ;msFilter:;">
    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM6.414 15.707 5 14.293 7.293 12 5 9.707l1.414-1.414L10.121 12l-3.707 3.707zM19 16h-7v-2h7v2z">
    </path>
    </svg>
  `;

  projects = [];

  activeSection: string = 'hero';

  ngOnInit() {
    this.onScroll();
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition = window.scrollY;

    this.sections.forEach(section => {
      const sectionElement = document.getElementById(section.id);
      if (sectionElement) {
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.offsetHeight;

        if (scrollPosition+80 >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          this.activeSection = section.id;
        }
      }
    });
  }

}
