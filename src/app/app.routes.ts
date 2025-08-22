import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },

  {
    path: 'cursos',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/cursos/cursos.component').then(m => m.CursosComponent)
  },

  {
    path: 'crear-curso',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/crear-curso/crear-curso.component').then(m => m.CrearCursoComponent)
  },

  { path: '**', redirectTo: '/login' }
];

