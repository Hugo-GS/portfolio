import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface EmailRequest {
  name: string;
  email: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  data?: any;
  error?: string;
}

@Injectable({
  providedIn: "root",
})
export class EmailService {
  private apiUrl = "/api/send-email";

  constructor(private http: HttpClient) {}

  sendEmail(emailData: EmailRequest): Observable<EmailResponse> {
    return this.http.post<EmailResponse>(this.apiUrl, emailData);
  }
}
