import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginScreen } from './login-screen/login-screen';
import { ProfileScreen } from './profile-screen/profile-screen';
import { DashboardScreen } from './dashboard-screen/dashboard-screen';
import { HistoryScreen } from './history-screen/history-screen';
import { StatsScreen } from './stats-screen/stats-screen';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginScreen],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'submission-tracker';
}
