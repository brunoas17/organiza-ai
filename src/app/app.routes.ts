import { Routes } from '@angular/router';
import { MainComponent } from './core/layouts/main/main.component';

export const routes: Routes = [
  {
    path: 'sistema',
    component: MainComponent,
    children: [
      {
        path: 'registrar-se',
        loadComponent: () => import('./modules/authentication/register/register.component').then(m => m.RegisterComponent)
      }
    ]
  },
  {
    path: '',
    loadComponent: () => import('./modules/under-construction/under-construction.component').then(m => m.UnderConstructionComponent)
  },
];
