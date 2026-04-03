import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cliniques',
  templateUrl: './cliniques.component.html',
  styleUrls: ['./cliniques.component.css']
})
export class CliniquesComponent {


constructor(private router: Router) {}

//goToChantepoulet() {
  //this.router.navigate(['/clinique-chantepoulet']);
//}

  goToBergues(clinicId: string) {
    this.router.navigate(['/clinique-bergues', clinicId]);
  }
}

