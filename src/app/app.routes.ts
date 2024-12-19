import { Routes } from '@angular/router';
import { RegisterComponent } from './modules/authentication/register/register.component';
import { UnderConstructionComponent } from './modules/under-construction/under-construction.component';

export const routes: Routes = [
  {
    path: '',
    component: UnderConstructionComponent
  },
  {
    path: 'registrar-se',
    component: RegisterComponent
  }
];
