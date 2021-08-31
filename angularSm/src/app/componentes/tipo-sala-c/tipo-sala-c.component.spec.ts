import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoSalaCComponent } from './tipo-sala-c.component';

describe('TipoSalaCComponent', () => {
  let component: TipoSalaCComponent;
  let fixture: ComponentFixture<TipoSalaCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoSalaCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoSalaCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
