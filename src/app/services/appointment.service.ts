import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = 'https://chantepoulet.api.prod.basmile.clt.secure4all.tech/AjouterRdv';
  //private baseUrl = 'http://localhost:8080/AjouterRdv';
  private authToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYkBiYXNtaWxlLmNvbSIsImV4cCI6NjIyMDIzMzk0NzEsImlhdCI6MTcyMjMzOTQ3MX0.WHAx1BN790pz8F801CBzeOXpyDMJNL5ZIOPyDLwhVQDSqSF8hYXamsRu1iiw0PmERRk5JfWdblxtlKvuUYddcA';

  constructor(private http: HttpClient) { }

  createAppointment(appointment: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `bearer ${this.authToken}`
    });
    return this.http.post(this.baseUrl, appointment, { headers });
  }
}