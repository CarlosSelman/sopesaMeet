import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { ReunionComponent } from './componentes/reunion/reunion.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'reunion', component: ReunionComponent},
  { path: '**', component: LoginComponent} //Ruta que me redirige al login si no existe la ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
