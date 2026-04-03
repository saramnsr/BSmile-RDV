import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SharedappointmentService } from '../services/sharedappointment.service';
import { FreehoursService } from "../services/freehours.service";
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-clinique-bergues',
  templateUrl: './clinique-bergues.component.html',
  styleUrls: ['./clinique-bergues.component.css']
})
export class CliniqueBerguesComponent implements OnInit, OnDestroy {

  creneauxDisponibles: string[] = [];
  creneauxAffiches: string[] = [];
  selectedDate: Date | null = null;
  clinicId: string | null = '';
  errorMessage: string = '';
  brandingImage: string = 'assets/img/Ibw8qny3_4x.jpg';
  currentFilter: 'all' | 'matin' | 'apres-midi' = 'all';
  
  showForm: boolean = false;
  rdvSelectedDateTime: string = '';
  
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedAppointmentService: SharedappointmentService,
    private freeHoursService: FreehoursService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.clinicId = params.get('clinicId');
    });

    const dateSub = this.sharedAppointmentService.selectedDateTime$.pipe(
      distinctUntilChanged((prev, curr) => {
        if (!prev || !curr) return prev === curr;
        return this.formatDate(prev) === this.formatDate(curr);
      })
    ).subscribe(date => {
      this.selectedDate = date;
      if (this.selectedDate) {
        this.loadAvailableSlots(this.selectedDate);
      }
    });

    this.subscription.add(dateSub);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadAvailableSlots(date: Date) {
    const formattedDate = this.formatDate(date);
    this.freeHoursService.getFreeHours(formattedDate).subscribe({
      next: (slots) => {
        console.log('Slots received by component:', slots);
        // Sort slots chronologically
        this.creneauxDisponibles = Array.from(new Set(slots)).sort();
        
        // Re-apply current filter to maintain view consistency
        if (this.currentFilter === 'matin') {
          this.afficherMatin();
        } else if (this.currentFilter === 'apres-midi') {
          this.afficherApresMidi();
        } else {
          this.creneauxAffiches = this.creneauxDisponibles;
        }
        
        this.errorMessage = '';
      },
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  afficherTous() {
    this.currentFilter = 'all';
    this.creneauxAffiches = this.creneauxDisponibles;
  }

  afficherMatin() {
    this.currentFilter = 'matin';
    this.creneauxAffiches = this.creneauxDisponibles.filter(creneau => creneau >= '08:00' && creneau < '14:00');
  }

  afficherApresMidi() {
    this.currentFilter = 'apres-midi';
    this.creneauxAffiches = this.creneauxDisponibles.filter(creneau => creneau >= '14:00');
  }

  prendreRendezVous(creneau: string) {
    if (!this.selectedDate) {
      console.error("Date non sélectionnée.");
      return;
    }

    const combinedDateTime = new Date(this.selectedDate);
    const [hours, minutes] = creneau.split(':').map(Number);
    combinedDateTime.setHours(hours);
    combinedDateTime.setMinutes(minutes);

    this.rdvSelectedDateTime = combinedDateTime.toISOString();
    this.showForm = true;
  }
}
