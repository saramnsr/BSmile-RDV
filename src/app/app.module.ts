import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MapComponent } from './map/map.component';
import {MatCardModule} from "@angular/material/card";
import {MatNativeDateModule, } from "@angular/material/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CliniquesComponent } from './cliniques/cliniques.component';
import { CliniqueChantepouleComponent } from './clinique-chantepoule/clinique-chantepoule.component';
import { CliniqueBerguesComponent } from './clinique-bergues/clinique-bergues.component';
import {RouterModule, Routes} from "@angular/router";
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {MatIconModule} from "@angular/material/icon";

import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatRippleModule } from '@angular/material/core';
import {
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MAT_DATEPICKER_SCROLL_STRATEGY } from '@angular/material/datepicker';
import {Overlay, ScrollStrategy, ScrollStrategyOptions} from '@angular/cdk/overlay';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";


const appRoutes: Routes = [
  { path: '', redirectTo: '/cliniques', pathMatch: 'full' },
  { path: 'cliniques', component: CliniquesComponent },

];
registerLocaleData(localeFr);
@NgModule({

  declarations: [

    AppComponent,
    CalendarComponent,
    MapComponent,
    HeaderComponent,
    FooterComponent,
    CliniquesComponent,
    CliniqueChantepouleComponent,
    CliniqueBerguesComponent,
    AppointmentFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    MatRippleModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule


  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' },   {
    provide: MAT_DATEPICKER_SCROLL_STRATEGY,
    deps: [Overlay, ScrollStrategyOptions],
    useFactory: scrollStrategyFactory
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function scrollStrategyFactory(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition();
}
