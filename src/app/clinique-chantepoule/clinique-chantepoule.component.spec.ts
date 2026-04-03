import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliniqueChantepouleComponent } from './clinique-chantepoule.component';

describe('CliniqueChantepouleComponent', () => {
  let component: CliniqueChantepouleComponent;
  let fixture: ComponentFixture<CliniqueChantepouleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CliniqueChantepouleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CliniqueChantepouleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
