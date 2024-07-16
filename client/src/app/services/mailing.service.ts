import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MailConfig } from '@app/interfaces/mail.interface';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailingService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  sendEmail(mailConfig: MailConfig): Observable<any> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.http.post(`${this.apiURL}/send-email`, mailConfig, httpOptions);
  }
}
