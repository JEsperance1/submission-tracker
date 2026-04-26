import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDataScreen } from './new-data-screen';

describe('NewDataScreen', () => {
  let component: NewDataScreen;
  let fixture: ComponentFixture<NewDataScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDataScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDataScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
