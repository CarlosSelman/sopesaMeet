import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTabletComponent } from './control-tablet.component';

describe('ControlTabletComponent', () => {
  let component: ControlTabletComponent;
  let fixture: ComponentFixture<ControlTabletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlTabletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
