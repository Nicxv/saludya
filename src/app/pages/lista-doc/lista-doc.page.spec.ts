import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaDocPage } from './lista-doc.page';

describe('ListaDocPage', () => {
  let component: ListaDocPage;
  let fixture: ComponentFixture<ListaDocPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
