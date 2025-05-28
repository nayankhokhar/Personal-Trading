import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindStocksPage } from './find-stocks.page';

describe('FindStocksPage', () => {
  let component: FindStocksPage;
  let fixture: ComponentFixture<FindStocksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FindStocksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
