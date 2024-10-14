import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListFchatPage } from './list-fchat.page';

describe('ListFchatPage', () => {
  let component: ListFchatPage;
  let fixture: ComponentFixture<ListFchatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFchatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
