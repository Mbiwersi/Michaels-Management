import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentTrackerComponent } from './rent-tracker.component';

describe('RentTrackerComponent', () => {
  let component: RentTrackerComponent;
  let fixture: ComponentFixture<RentTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
