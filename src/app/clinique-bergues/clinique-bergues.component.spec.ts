import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliniqueBerguesComponent } from './clinique-bergues.component';

describe('CliniqueBerguesComponent', () => {
  let component: CliniqueBerguesComponent;
  let fixture: ComponentFixture<CliniqueBerguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CliniqueBerguesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CliniqueBerguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
