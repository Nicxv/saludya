import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },  {
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

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
