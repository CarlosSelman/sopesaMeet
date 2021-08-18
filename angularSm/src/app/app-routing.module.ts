import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { ReunionComponent } from './componentes/reunion/reunion.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'usuario', component: UsuarioComponent},
  { path: 'reunion', component: ReunionComponent},
  { path: '**', component: LoginComponent} //Ruta que me redirige al login si no existe la ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
