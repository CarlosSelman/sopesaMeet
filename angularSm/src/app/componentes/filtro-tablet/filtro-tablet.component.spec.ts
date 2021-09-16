import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTabletComponent } from './filtro-tablet.component';

describe('FiltroTabletComponent', () => {
  let component: FiltroTabletComponent;
  let fixture: ComponentFixture<FiltroTabletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroTabletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
