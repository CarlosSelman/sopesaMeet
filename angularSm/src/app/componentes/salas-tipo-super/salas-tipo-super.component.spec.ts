import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasTipoSuperComponent } from './salas-tipo-super.component';

describe('SalasTipoSuperComponent', () => {
  let component: SalasTipoSuperComponent;
  let fixture: ComponentFixture<SalasTipoSuperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalasTipoSuperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalasTipoSuperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
