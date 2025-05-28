import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawdownPage } from './drawdown.page';

describe('DrawdownPage', () => {
  let component: DrawdownPage;
  let fixture: ComponentFixture<DrawdownPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawdownPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
