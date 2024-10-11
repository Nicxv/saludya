import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudfuncionarioPage } from './solicitudfuncionario.page';

describe('SolicitudfuncionarioPage', () => {
  let component: SolicitudfuncionarioPage;
  let fixture: ComponentFixture<SolicitudfuncionarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudfuncionarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
