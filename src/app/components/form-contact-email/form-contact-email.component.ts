import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { EmailService, EmailRequest } from "../../services/email.service";

@Component({
  selector: "app-form-contact-email",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./form-contact-email.component.html",
  styleUrl: "./form-contact-email.component.css",
})
export class FormContactEmailComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  submitStatus: "idle" | "success" | "error" = "idle";
  errorMessage = "";

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
  ) {
    this.contactForm = this.fb.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      telefono: [""],
      email: ["", [Validators.required, Validators.email]],
      comentario: ["", [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitStatus = "idle";
      this.errorMessage = "";

      const emailData: EmailRequest = {
        name: this.contactForm.value.nombre,
        email: this.contactForm.value.email,
        message: this.contactForm.value.comentario,
      };

      this.emailService.sendEmail(emailData).subscribe({
        next: (response) => {
          this.submitStatus = "success";
          this.isSubmitting = false;
          this.contactForm.reset();

          setTimeout(() => {
            this.submitStatus = "idle";
          }, 5000);
        },
        error: (error) => {
          this.submitStatus = "error";
          this.isSubmitting = false;
          this.errorMessage =
            error.error?.error ||
            "Error al enviar el mensaje. Por favor, intenta de nuevo.";

          setTimeout(() => {
            this.submitStatus = "idle";
            this.errorMessage = "";
          }, 5000);
        },
      });
    } else {
      Object.keys(this.contactForm.controls).forEach((key) => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.hasError("required")) {
      return "Este campo es requerido";
    }
    if (field?.hasError("email")) {
      return "Ingresa un correo electrónico válido";
    }
    if (field?.hasError("minlength")) {
      const minLength = field.errors?.["minlength"].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    return "";
  }
}
