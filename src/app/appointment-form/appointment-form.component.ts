import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { ActeService } from '../services/acte.service';
import { AppointmentService } from '../services/appointment.service';
import { SharedappointmentService } from '../services/sharedappointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  @Input() clinicId: string | null = null;
  @Input() daterdv: string | null = null;

  appointmentForm: FormGroup;
  actes: any[] = [];
  errorMessage: string = '';
  showSuccessModal: boolean = false;
  selectedClinic: string = '';

  constructor(
    private sharedAppointmentService: SharedappointmentService,
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private acteService: ActeService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.appointmentForm = this.fb.group({
      civlite: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      acte: ['', Validators.required],
      typerdv: ['', Validators.required],
      daterdv: ['', Validators.required],
      cliniques: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadActes();

    if (this.clinicId || this.daterdv) {
      if (this.clinicId) {
        this.selectedClinic = this.clinicId === '1' ? 'Clinique Chantepoulet' : 'Clinique Bergues';
        this.appointmentForm.patchValue({ cliniques: this.selectedClinic });
      }
      if (this.daterdv) {
        this.appointmentForm.patchValue({ daterdv: moment(this.daterdv).format('YYYY-MM-DDTHH:mm:ss') });
      }
    } else {
      this.route.queryParams.subscribe(params => {
        const cid = params['clinicId'];
        if (cid) {
          this.selectedClinic = cid === '1' ? 'Clinique Chantepoulet' : 'Clinique Bergues';
          this.appointmentForm.patchValue({ cliniques: this.selectedClinic });
        }

        const drdv = params['daterdv'];
        if (drdv) {
          this.appointmentForm.patchValue({ daterdv: moment(drdv).format('YYYY-MM-DDTHH:mm:ss') });
        }
      });
    }
  }

  loadActes(): void {
    this.acteService.getActes().subscribe(
      (data: any[]) => {
        this.actes = data;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des actes:', error);
        this.errorMessage = 'Erreur lors de la récupération des actes. Veuillez réessayer.';
      }
    );
  }

  onActeChange(event: any): void {
    const selectedActeValue = event.target.value;
    let typeRdvId = 0; // Default for consultations
    
    if (selectedActeValue === 'Blanchiment') {
      typeRdvId = 1;
    } else if (selectedActeValue === 'Détartrage') {
      typeRdvId = 2;
    } else if (selectedActeValue === 'Autre') {
      typeRdvId = 3;
    }
    
    this.appointmentForm.patchValue({ typerdv: typeRdvId });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const formValue = this.appointmentForm.value;
      
      const payload = {
        nom: formValue.nom,
        prenom: formValue.prenom,
        email: formValue.email,
        dateNaiss: moment(formValue.dateNaissance).format('YYYY-MM-DD'),
        telephone: Number(formValue.telephone.toString().replace(/\s/g, '').replace(/\+/g, '')),
        adresse: formValue.adresse,
        typerdv: formValue.typerdv,
        status: 0,
        daterdv: moment(formValue.daterdv).format('YYYY-MM-DD HH:mm'),
        cliniques: this.selectedClinic
      };

      console.log('Données du formulaire (mappées):', payload);

      this.appointmentService.createAppointment(payload).subscribe(
        response => {
          console.log('Rendez-vous créé avec succès:', response);
          this.showSuccessModal = true;
          // Auto-navigate after 6 seconds
          setTimeout(() => {
            this.showSuccessModal = false;
            this.router.navigate(['/cliniques']);
          }, 6000);
        },
        error => {
          console.error('Erreur lors de la création du rendez-vous:', error);
          this.errorMessage = 'Erreur lors de la création du rendez-vous. Veuillez réessayer.';
        }
      );
    } else {
      console.error('Le formulaire est invalide.');
    }
  }

  isMinor(dateOfBirth: string | null): boolean {
    if (!dateOfBirth) {
      return false;
    }
    return moment().diff(moment(dateOfBirth, 'YYYY-MM-DD'), 'years') < 16;
  }

  dateOfBirthFilter = (date: Date | null): boolean => {
    const today = new Date();
    return date ? date < today : false;
  };
}
