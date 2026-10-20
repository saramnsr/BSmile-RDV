import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CliniquesComponent} from "./cliniques/cliniques.component";
import {CliniqueBerguesComponent} from "./clinique-bergues/clinique-bergues.component";
import {CliniqueChantepouleComponent} from "./clinique-chantepoule/clinique-chantepoule.component";
import {AppointmentFormComponent} from "./appointment-form/appointment-form.component";


const routes: Routes = [
  { path: '', redirectTo: '/cliniques', pathMatch: 'full' },
  { path: 'clinique-bergues/:clinicId', component: CliniqueBerguesComponent },
  { path: 'cliniques', component: CliniquesComponent },
  { path: 'clinique-chantepoulet', component: CliniqueChantepouleComponent },
  { path: 'clinique-bergues', component: CliniqueBerguesComponent },
  { path: 'appointment-form', component: AppointmentFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
