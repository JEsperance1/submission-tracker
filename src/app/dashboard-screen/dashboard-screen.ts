import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SupabaseService } from '../services/supabase';

interface Submission {
  submission: string;
  trainingPartner: string;
  position: string;
  result: string;
}

@Component({
  selector: 'app-dashboard-screen',
  imports: [CommonModule],
  templateUrl: './dashboard-screen.html',
  styleUrl: './dashboard-screen.css',
})
export class DashboardScreen implements OnInit, OnDestroy {

  submissions: Submission[] = [];
  intervalId: any;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    await this.loadSubmissions();

    this.intervalId = setInterval(() => {
      this.loadSubmissions();
    }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  async loadSubmissions() {
    const data = await this.supabaseService.getSubmissions();

    this.submissions = data.map((row: any) => ({
      submission: row.submission,
      trainingPartner: row.training_partner,
      position: row.position,
      result: row.result
    })).slice(0, 5);
  }
}