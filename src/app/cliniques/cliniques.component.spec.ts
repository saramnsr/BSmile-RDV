import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliniquesComponent } from './cliniques.component';

describe('CliniquesComponent', () => {
  let component: CliniquesComponent;
  let fixture: ComponentFixture<CliniquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CliniquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CliniquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
