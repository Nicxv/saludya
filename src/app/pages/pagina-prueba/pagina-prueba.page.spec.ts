import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaPruebaPage } from './pagina-prueba.page';

describe('PaginaPruebaPage', () => {
  let component: PaginaPruebaPage;
  let fixture: ComponentFixture<PaginaPruebaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaPruebaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
