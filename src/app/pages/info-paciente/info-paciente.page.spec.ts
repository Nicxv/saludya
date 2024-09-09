import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoPacientePage } from './info-paciente.page';

describe('InfoPacientePage', () => {
  let component: InfoPacientePage;
  let fixture: ComponentFixture<InfoPacientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
