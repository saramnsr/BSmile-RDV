// src/app/services/sharedappointment.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedappointmentService {
  private selectedDateTimeSource = new BehaviorSubject<Date | null>(null);
  selectedDateTime$ = this.selectedDateTimeSource.asObservable();

  updateSelectedDateTime(dateTime: Date): void {
    this.selectedDateTimeSource.next(dateTime);
  }
}
