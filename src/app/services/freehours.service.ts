import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FreehoursService {

  private apiUrl = 'https://chantepoulet.api.prod.basmile.clt.secure4all.tech/fauteuil/getFreeTimeIntervals';
  //private apiUrl = 'http://localhost:8080/fauteuil/getFreeTimeIntervals';

  private authToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYkBiYXNtaWxlLmNvbSIsImV4cCI6NjIyMDIzMzk0NzEsImlhdCI6MTcyMjMzOTQ3MX0.WHAx1BN790pz8F801CBzeOXpyDMJNL5ZIOPyDLwhVQDSqSF8hYXamsRu1iiw0PmERRk5JfWdblxtlKvuUYddcA';

  constructor(private http: HttpClient) { }

  getFreeHours(date: string): Observable<string[]> {
    const headers = new HttpHeaders({
      'Authorization': `bearer ${this.authToken}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/${date}`, { headers }).pipe(
      map(response => {
        console.log(`Raw backend response for ${date}:`, response);
        return response.map(item => {
          // Use moment to safely extract the time part (HH:mm:ss)
          return moment(item.start, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
        });
      })
    );
  }
}
