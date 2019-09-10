import { Routes } from '@angular/router';

import { HomeComponentTns } from './home/home.component.tns';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full',
  },
  {
      path: 'home',
      component: HomeComponentTns,
  },
];
