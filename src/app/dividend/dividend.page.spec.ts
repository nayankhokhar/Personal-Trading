import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DividendPage } from './dividend.page';

describe('DividendPage', () => {
  let component: DividendPage;
  let fixture: ComponentFixture<DividendPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DividendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
