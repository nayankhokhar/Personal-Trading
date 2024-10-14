import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalTradingPage } from './personal-trading.page';

describe('PersonalTradingPage', () => {
  let component: PersonalTradingPage;
  let fixture: ComponentFixture<PersonalTradingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalTradingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
