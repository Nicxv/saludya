import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DescMedicaPage } from './desc-medica.page';

describe('DescMedicaPage', () => {
  let component: DescMedicaPage;
  let fixture: ComponentFixture<DescMedicaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DescMedicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
