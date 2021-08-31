import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleTipoSalaComponent } from './componentes/detalle-tipo-sala/detalle-tipo-sala.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { ReunionComponent } from './componentes/reunion/reunion.component';
import { TipoSalaCComponent } from './componentes/tipo-sala-c/tipo-sala-c.component';
import { TipoSalaComponent } from './componentes/tipo-sala/tipo-sala.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'usuarios', component: UsuarioComponent},
  { path: 'tipoSalas', component: TipoSalaComponent},
  { path: 'reunion', component: ReunionComponent},
  { path: 'detalleTipoSala/:idTipoSala', component: DetalleTipoSalaComponent },
  { path: 'tipoSalasC', component: TipoSalaCComponent},
  { path: '**', component: LoginComponent} //Ruta que me redirige al login si no existe la ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
