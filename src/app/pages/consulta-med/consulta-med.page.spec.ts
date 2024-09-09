import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaMedPage } from './consulta-med.page';

describe('ConsultaMedPage', () => {
  let component: ConsultaMedPage;
  let fixture: ComponentFixture<ConsultaMedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaMedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
