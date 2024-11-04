import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisCertificadosPage } from './mis-certificados.page';

describe('MisCertificadosPage', () => {
  let component: MisCertificadosPage;
  let fixture: ComponentFixture<MisCertificadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MisCertificadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
