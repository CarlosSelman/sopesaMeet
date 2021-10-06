//Importaciones de Componentes (Diferentes vistas en la página)
import { CrearSalaComponent } from './componentes/crear-sala/crear-sala.component';
import { DetalleSalaComponent } from './componentes/detalle-sala/detalle-sala.component';
import { DetalleTipoSalaComponent } from './componentes/detalle-tipo-sala/detalle-tipo-sala.component';
import { ErrorNoExisteComponent } from './componentes/error-no-existe/error-no-existe.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { SalaComponent } from './componentes/sala/sala.component';
import { SalasTipoSuperComponent } from './componentes/salas-tipo-super/salas-tipo-super.component';
import { SalasTipoComponent } from './componentes/salas-tipo/salas-tipo.component';
import { TipoSalaCComponent } from './componentes/tipo-sala-c/tipo-sala-c.component';
import { TipoSalaComponent } from './componentes/tipo-sala/tipo-sala.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { DatosUsuarioComponent } from './componentes/datos-usuario/datos-usuario.component';
import { FiltroTabletComponent } from './componentes/filtro-tablet/filtro-tablet.component';
import { VisorEventosComponent } from './componentes/visor-eventos/visor-eventos.component';
import { VisorEventosSalaComponent } from './componentes/visor-eventos-sala/visor-eventos-sala.component';

//Otras importaciones
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Diferentes rutas a las que se puede navegar
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'usuarios', component: UsuarioComponent},
  { path: 'tipoSalas', component: TipoSalaComponent},
  { path: 'datosPerfil/:idResponsable', component: DatosUsuarioComponent},
  { path: 'salas', component: SalaComponent},
  { path: 'salasTipo/:idTipoSala', component: SalasTipoComponent},
  { path: 'salasTipoSuper/:idTipoSala', component: SalasTipoSuperComponent},
  { path: 'detalleTipoSala/:idTipoSala', component: DetalleTipoSalaComponent },
  { path: 'detalleSala/:idSala', component: DetalleSalaComponent },
  { path: 'tipoSalasC', component: TipoSalaCComponent},
  { path: 'crearSala', component: CrearSalaComponent},
  { path: 'filtroTablet', component: FiltroTabletComponent},
  { path: 'visorEventos', component: VisorEventosComponent},
  { path: 'visorEventosSala/:idSala', component: VisorEventosSalaComponent},
  { path: '**', component: ErrorNoExisteComponent} //Ruta que me redirige al error 404 si no existe la ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
