import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsScreen } from './stats-screen';

describe('StatsScreen', () => {
  let component: StatsScreen;
  let fixture: ComponentFixture<StatsScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
