// src/app/calendar/calendar.component.ts

import { Component, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { SharedappointmentService } from "../services/sharedappointment.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  selectedDate: Date | null = new Date();
  minDate = new Date(new Date().getFullYear(), 0, 1);

  constructor(private sharedAppointmentService: SharedappointmentService) {}

  ngOnInit(): void {
    if (this.selectedDate) {
      this.sharedAppointmentService.updateSelectedDateTime(this.selectedDate);
    }
  }

  dateClass = (date: Date): MatCalendarCellCssClasses => {
    const highlightDate = new Date(2024, 1, 28);
    return date.getTime() === highlightDate.getTime() ? 'special-date' : '';
  }

  onDateChange(newDate: Date | null): void {
    if (newDate) {
      this.selectedDate = newDate;
      this.sharedAppointmentService.updateSelectedDateTime(newDate);
    }
  }

  dateFilter = (d: Date | null): boolean => {
    if (d) {
      const day = d.getDay();
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      const isWeekend = day === 0 || day === 6;

      return d >= this.minDate && d >= currentDate && !isWeekend;
    }
    return false;
  }
}
