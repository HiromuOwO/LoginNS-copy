import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Ruta para el login
  { path: 'inicio', component: InicioComponent },
  { path: 'usuarios', component: UsuariosComponent }, // Ruta para el inicio
  { path: '**', redirectTo: '' } // Redirige cualquier otra ruta al login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }