import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'pagina-prueba',
    loadChildren: () => import('./pages/pagina-prueba/pagina-prueba.module').then( m => m.PaginaPruebaPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'p-principal',
    loadChildren: () => import('./pages/p-principal/p-principal.module').then( m => m.PPrincipalPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'desc-medica',
    loadChildren: () => import('./pages/desc-medica/desc-medica.module').then( m => m.DescMedicaPageModule)
  },
  {
    path: 'lista-doc',
    loadChildren: () => import('./pages/lista-doc/lista-doc.module').then( m => m.ListaDocPageModule)
  },
  {
    path: 'perfiles-docs',
    loadChildren: () => import('./pages/perfiles-docs/perfiles-docs.module').then( m => m.PerfilesDocsPageModule)
  },
  {
    path: 'contactanos',
    loadChildren: () => import('./pages/contactanos/contactanos.module').then( m => m.ContactanosPageModule)
  },
  {
    path: 'historia-pacientes',
    loadChildren: () => import('./pages/historia-pacientes/historia-pacientes.module').then( m => m.HistoriaPacientesPageModule)
  },
  {
    path: 'info-paciente',
    loadChildren: () => import('./pages/info-paciente/info-paciente.module').then( m => m.InfoPacientePageModule)
  },
  {
    path: 'consulta-med',
    loadChildren: () => import('./pages/consulta-med/consulta-med.module').then( m => m.ConsultaMedPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'datos-adicionales',
    loadChildren: () => import('./pages/datos-adicionales/datos-adicionales.module').then( m => m.DatosAdicionalesPageModule)
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./pages/ajustes/ajustes.module').then( m => m.AjustesPageModule),
    canActivate: [adminGuard] // Añadir el guard aquí para que solo pueda entrar un usuario admin
  },
  {
    path: 'verperfil',
    loadChildren: () => import('./pages/verperfil/verperfil.module').then( m => m.VerperfilPageModule)
  },
  {
    path: 'lista-usuarios-admin',
    loadChildren: () => import('./pages/lista-usuarios-admin/lista-usuarios-admin.module').then( m => m.ListaUsuariosAdminPageModule),
    canActivate: [adminGuard] //admin guard
  },
  {
    path: 'mensajes',
    loadChildren: () => import('./pages/mensajes/mensajes.module').then( m => m.MensajesPageModule)
  },
  {
    path: 'msj-funcionario',
    loadChildren: () => import('./pages/msj-funcionario/msj-funcionario.module').then( m => m.MsjFuncionarioPageModule)
  },
  {
    path: 'list-fchat',
    loadChildren: () => import('./pages/list-fchat/list-fchat.module').then( m => m.ListFchatPageModule),
    canActivate: [adminGuard]
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
