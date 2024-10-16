import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesionalesSeguimientoPage } from './profesionales-seguimiento.page';

describe('ProfesionalesSeguimientoPage', () => {
  let component: ProfesionalesSeguimientoPage;
  let fixture: ComponentFixture<ProfesionalesSeguimientoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalesSeguimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
