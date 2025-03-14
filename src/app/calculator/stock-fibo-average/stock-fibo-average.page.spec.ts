import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockFiboAveragePage } from './stock-fibo-average.page';

describe('StockFiboAveragePage', () => {
  let component: StockFiboAveragePage;
  let fixture: ComponentFixture<StockFiboAveragePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StockFiboAveragePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
