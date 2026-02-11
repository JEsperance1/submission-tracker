import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryScreen } from './history-screen';

describe('HistoryScreen', () => {
  let component: HistoryScreen;
  let fixture: ComponentFixture<HistoryScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
