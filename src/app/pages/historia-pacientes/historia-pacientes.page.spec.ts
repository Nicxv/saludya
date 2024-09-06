import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoriaPacientesPage } from './historia-pacientes.page';

describe('HistoriaPacientesPage', () => {
  let component: HistoriaPacientesPage;
  let fixture: ComponentFixture<HistoriaPacientesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaPacientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
