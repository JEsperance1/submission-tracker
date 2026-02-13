import { Routes } from '@angular/router';
import { LoginScreen } from './login-screen/login-screen';
import { DashboardScreen } from './dashboard-screen/dashboard-screen';
import { StatsScreen } from './stats-screen/stats-screen';
import { HistoryScreen } from './history-screen/history-screen';
import { ProfileScreen } from './profile-screen/profile-screen';


export const routes: Routes = [ {path: '', component: LoginScreen},
                                {path: 'dashboard', component: DashboardScreen},
                                {path: 'login', component: LoginScreen},
                                {path: 'stats', component: StatsScreen},
                                {path: 'history', component: HistoryScreen},
                                {path: 'profile', component: ProfileScreen}
];
