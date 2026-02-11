import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { ProfileScreenComponent } from './profile-screen/profile-screen.component';
import { DashboardScreenComponent } from './dashboard-screen/dashboard-screen.component';
import { HistoryScreenComponent } from './history-screen/history-screen.component';
import { StatsScreenComponent } from './stats-screen/stats-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfileScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'submission-tracker';
}
