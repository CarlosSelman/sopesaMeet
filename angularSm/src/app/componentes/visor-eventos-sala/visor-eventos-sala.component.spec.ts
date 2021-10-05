import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorEventosSalaComponent } from './visor-eventos-sala.component';

describe('VisorEventosSalaComponent', () => {
  let component: VisorEventosSalaComponent;
  let fixture: ComponentFixture<VisorEventosSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisorEventosSalaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisorEventosSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
