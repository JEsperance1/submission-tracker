import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SupabaseService } from './services/supabase';

import { LoginScreen } from './login-screen/login-screen';
import { DashboardScreen } from './dashboard-screen/dashboard-screen';
import { StatsScreen } from './stats-screen/stats-screen';
import { HistoryScreen } from './history-screen/history-screen';
import { ProfileScreen } from './profile-screen/profile-screen';

const authGuard = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  const { data } = await supabase.getSession();

  if (!data.session) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

export const routes: Routes = [
  { path: '', component: LoginScreen },
  { path: 'login', component: LoginScreen },

  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardScreen },
      { path: 'stats', component: StatsScreen },
      { path: 'history', component: HistoryScreen },
      { path: 'profile', component: ProfileScreen }
    ]
  },

  { path: '**', redirectTo: 'login' }
];