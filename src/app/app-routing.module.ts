import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { funcionarioGuard } from './guards/funcionario.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
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
    canActivate: [funcionarioGuard]
  },
  {
    path: 'profesionales-busqueda',
    loadChildren: () => import('./pages/profesionales-busqueda/profesionales-busqueda.module').then( m => m.ProfesionalesBusquedaPageModule)
  },
  {
    path: 'profesionales-seguimiento',
    loadChildren: () => import('./pages/profesionales-seguimiento/profesionales-seguimiento.module').then( m => m.ProfesionalesSeguimientoPageModule)
  },
  {
    path: 'profesional-consulta-alerta',
    loadChildren: () => import('./pages/profesional-consulta-alerta/profesional-consulta-alerta.module').then( m => m.ProfesionalConsultaAlertaPageModule),
    canActivate: [funcionarioGuard]
  },
  {
    path: 'map-paciente',
    loadChildren: () => import('./pages/map-paciente/map-paciente.module').then( m => m.MapPacientePageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'mis-certificados',
    loadChildren: () => import('./pages/mis-certificados/mis-certificados.module').then( m => m.MisCertificadosPageModule)
  },
  {
    path: 'lista-reportes',
    loadChildren: () => import('./pages/lista-reportes/lista-reportes.module').then( m => m.ListaReportesPageModule)
  },
  {
    path: 'mis-certificadosf',
    loadChildren: () => import('./pages/mis-certificadosf/mis-certificadosf.module').then( m => m.MisCertificadosfPageModule)
  },



  
  /* La de abajo es la pagina de error, siempre debe ir al ultimo,
   cuando creen una pagina, deben mover la recien creada arriba de la pag de error*/
  {
    path: '**',
    loadChildren: () => import('./pages/pagina-prueba/pagina-prueba.module').then( m => m.PaginaPruebaPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
