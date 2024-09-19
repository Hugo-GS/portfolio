import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarTopComponent } from "./components/navbar-top/navbar-top.component";
import { ContainerboxComponent } from "./components/containerbox/containerbox.component";
import { FormContactEmailComponent } from "./components/form-contact-email/form-contact-email.component";
import { ContainerboxProjectComponent } from "./components/containerbox-project/containerbox-project.component";
import { FooterContactComponent } from "./components/footer-contact/footer-contact.component";

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
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "portfolio";
}
