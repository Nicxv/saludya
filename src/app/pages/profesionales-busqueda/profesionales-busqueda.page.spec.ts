import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesionalesBusquedaPage } from './profesionales-busqueda.page';

describe('ProfesionalesBusquedaPage', () => {
  let component: ProfesionalesBusquedaPage;
  let fixture: ComponentFixture<ProfesionalesBusquedaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalesBusquedaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
