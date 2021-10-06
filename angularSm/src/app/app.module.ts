// Para los componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Componentes
import { LoginComponent } from './componentes/login/login.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { DatosUsuarioComponent } from './componentes/datos-usuario/datos-usuario.component';
import { TipoSalaComponent } from './componentes/tipo-sala/tipo-sala.component';
import { SalaComponent } from './componentes/sala/sala.component';
import { DetalleTipoSalaComponent } from './componentes/detalle-tipo-sala/detalle-tipo-sala.component';
import { TipoSalaCComponent } from './componentes/tipo-sala-c/tipo-sala-c.component';

// Angular...
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';

import { DetalleSalaComponent } from './componentes/detalle-sala/detalle-sala.component';
import { SalasTipoComponent } from './componentes/salas-tipo/salas-tipo.component';
import { SalasTipoSuperComponent } from './componentes/salas-tipo-super/salas-tipo-super.component';
import { ErrorNoExisteComponent } from './componentes/error-no-existe/error-no-existe.component';
import { CrearSalaComponent } from './componentes/crear-sala/crear-sala.component';

//import {  DateAdapter } from 'angular-calendar';
//import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { FiltroTabletComponent } from './componentes/filtro-tablet/filtro-tablet.component';

import { VisorEventosComponent } from './componentes/visor-eventos/visor-eventos.component';

import { CheckboxModule } from 'primeng/checkbox';

import { FullCalendarModule } from 'primeng/fullcalendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule } from 'primeng/calendar';
import { VisorEventosSalaComponent } from './componentes/visor-eventos-sala/visor-eventos-sala.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    InicioComponent,
    UsuarioComponent,
    DatosUsuarioComponent,
    TipoSalaComponent,
    SalaComponent,
    DetalleTipoSalaComponent,
    TipoSalaCComponent,
    DetalleSalaComponent,
    SalasTipoComponent,
    SalasTipoSuperComponent,
    ErrorNoExisteComponent,
    CrearSalaComponent,
    FiltroTabletComponent,
    VisorEventosComponent,
    VisorEventosSalaComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,

    NgbModalModule,
    FlatpickrModule.forRoot(),

    /*
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
*/
    FullCalendarModule,
    CheckboxModule,
    CalendarModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
