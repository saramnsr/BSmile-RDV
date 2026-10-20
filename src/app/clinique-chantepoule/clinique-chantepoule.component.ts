import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SharedappointmentService} from "../services/sharedappointment.service";

@Component({
  selector: 'app-clinique-chantepoule',
  templateUrl: './clinique-chantepoule.component.html',
  styleUrls: ['./clinique-chantepoule.component.css']
})
export class CliniqueChantepouleComponent {
  creneauxDisponibles: string[] = ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'];
  creneauxAffiches: string[] = [];
  selectedDate: Date | null = null;
  clinicId: string | null = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedAppointmentService: SharedappointmentService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.clinicId = params.get('clinicId')
      // Utiliser clinicId pour charger des données spécifiques à la clinique
    });

    // Récupérer la date sélectionnée du service
    this.sharedAppointmentService.selectedDateTime$.subscribe(date => {
      this.selectedDate = date;
      if (this.selectedDate) {
        this.creneauxAffiches = this.creneauxDisponibles;
      }
    });
  }

  afficherTous() {
    this.creneauxAffiches = this.creneauxDisponibles;
  }

  afficherMatin() {
    this.creneauxAffiches = this.creneauxDisponibles.filter(creneau => creneau >= '08:00' && creneau < '12:00');
  }

  afficherApresMidi() {
    this.creneauxAffiches = this.creneauxDisponibles.filter(creneau => creneau >= '12:00');
  }

  prendreRendezVous(creneau: string) {
    if (!this.selectedDate) {
      this.errorMessage = "Veuillez sélectionner une date sur le calendrier avant de choisir un créneau.";
      console.error("Date non sélectionnée.");
      return;
    }
    this.errorMessage = '';

    // Combinez la date sélectionnée et l'heure du créneau
    const combinedDateTime = new Date(this.selectedDate);
    const [hours, minutes] = creneau.split(':').map(Number);
    combinedDateTime.setHours(hours);
    combinedDateTime.setMinutes(minutes);

    // Naviguer vers le formulaire de rendez-vous avec la date et l'heure combinées
    this.router.navigate(['/appointment-form'], { queryParams: { daterdv: combinedDateTime.toISOString() ,  clinicId: this.clinicId } });
  }
}
