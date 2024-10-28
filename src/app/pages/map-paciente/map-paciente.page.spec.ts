import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapPacientePage } from './map-paciente.page';

describe('MapPacientePage', () => {
  let component: MapPacientePage;
  let fixture: ComponentFixture<MapPacientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
