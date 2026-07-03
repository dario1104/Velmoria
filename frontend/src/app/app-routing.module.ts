import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),
  },
  {
    path: 'trips',
    loadChildren: () => import('./trips/trips.module').then(m => m.TripsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'trip-detail/:id',
    loadChildren: () => import('./trip-detail/trip-detail.module').then(m => m.TripDetailPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'trip-form/:id',
    loadChildren: () => import('./trip-form/trip-form.module').then(m => m.TripFormPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'trip-form',
    loadChildren: () => import('./trip-form/trip-form.module').then(m => m.TripFormPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'trips',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
