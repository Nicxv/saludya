import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaUsuariosAdminPage } from './lista-usuarios-admin.page';

describe('ListaUsuariosAdminPage', () => {
  let component: ListaUsuariosAdminPage;
  let fixture: ComponentFixture<ListaUsuariosAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaUsuariosAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
