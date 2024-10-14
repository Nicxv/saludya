import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MsjFuncionarioPage } from './msj-funcionario.page';

describe('MsjFuncionarioPage', () => {
  let component: MsjFuncionarioPage;
  let fixture: ComponentFixture<MsjFuncionarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MsjFuncionarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
