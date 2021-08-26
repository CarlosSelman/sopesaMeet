import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoSalaComponent } from './tipo-sala.component';

describe('TipoSalaComponent', () => {
  let component: TipoSalaComponent;
  let fixture: ComponentFixture<TipoSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoSalaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
