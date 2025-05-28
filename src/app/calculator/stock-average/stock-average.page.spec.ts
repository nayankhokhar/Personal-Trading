import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockAveragePage } from './stock-average.page';

describe('StockAveragePage', () => {
  let component: StockAveragePage;
  let fixture: ComponentFixture<StockAveragePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAveragePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
