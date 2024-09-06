import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilesDocsPage } from './perfiles-docs.page';

describe('PerfilesDocsPage', () => {
  let component: PerfilesDocsPage;
  let fixture: ComponentFixture<PerfilesDocsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilesDocsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
