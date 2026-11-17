import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { from, Observable } from 'rxjs';

export interface AppointmentEmailData {
  civilite: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  patient_email: string;
  telephone: string;
  adresse: string;
  acte: string;
  clinique: string;
  date_rdv: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private readonly SERVICE_ID = 'service_jginvpq';
  private readonly TEMPLATE_ID = 'template_otxqeic';
  private readonly PUBLIC_KEY = 'aa04u3q0A84wqEitj';

  constructor() {
    emailjs.init({ publicKey: this.PUBLIC_KEY });
  }

  sendAppointmentEmail(data: AppointmentEmailData): Observable<EmailJSResponseStatus> {
    return from(emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, { ...data }));
  }
}