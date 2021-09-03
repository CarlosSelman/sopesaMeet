import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasTipoComponent } from './salas-tipo.component';

describe('SalasTipoComponent', () => {
  let component: SalasTipoComponent;
  let fixture: ComponentFixture<SalasTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalasTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalasTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
