import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTipoSalaComponent } from './detalle-tipo-sala.component';

describe('DetalleTipoSalaComponent', () => {
  let component: DetalleTipoSalaComponent;
  let fixture: ComponentFixture<DetalleTipoSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleTipoSalaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTipoSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
