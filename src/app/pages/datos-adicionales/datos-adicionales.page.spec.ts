import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosAdicionalesPage } from './datos-adicionales.page';

describe('DatosAdicionalesPage', () => {
  let component: DatosAdicionalesPage;
  let fixture: ComponentFixture<DatosAdicionalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosAdicionalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
