import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


interface Submission {
  submission: string;
  trainingPartner: string;
  position: string;
  result: string;
}

@Component({
  selector: 'app-dashboard-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-screen.component.html',
  styleUrl: './dashboard-screen.component.css'
})
export class DashboardScreenComponent {
submissions: Submission[] = [];
}
