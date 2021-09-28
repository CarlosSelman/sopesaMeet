import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarPComponent } from './calendar-p.component';

describe('CalendarPComponent', () => {
  let component: CalendarPComponent;
  let fixture: ComponentFixture<CalendarPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
