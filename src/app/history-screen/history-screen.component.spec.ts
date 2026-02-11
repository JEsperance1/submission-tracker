import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryScreenComponent } from './history-screen.component';

describe('HistoryScreenComponent', () => {
  let component: HistoryScreenComponent;
  let fixture: ComponentFixture<HistoryScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
