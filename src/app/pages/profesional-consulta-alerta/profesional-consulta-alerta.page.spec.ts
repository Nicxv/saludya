import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesionalConsultaAlertaPage } from './profesional-consulta-alerta.page';

describe('ProfesionalConsultaAlertaPage', () => {
  let component: ProfesionalConsultaAlertaPage;
  let fixture: ComponentFixture<ProfesionalConsultaAlertaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalConsultaAlertaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
