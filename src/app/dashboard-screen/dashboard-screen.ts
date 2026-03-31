import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  styleUrls: ['./dashboard-screen.css'],
})
export class DashboardScreen implements OnInit, OnDestroy {

  submissions: Submission[] = [];
  intervalId: any;

  private router = inject(Router);

  constructor(private supabaseService: SupabaseService, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    await this.loadSubmissions();

    this.intervalId = setInterval(() => {
      this.loadSubmissions();
    }, 2000);

    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  async loadSubmissions() {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('id', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching submissions:', error);
      this.submissions = [];
      return;
    }

    this.submissions = data
      .map((row: any) => ({
        submission: row.submission,
        trainingPartner: row.training_partner,
        position: row.position,
        result: row.result
      }))
  }

  // 🔐 Sign-out method
  logout = async () => {
    // ✅ Use service that returns result
    const res = await this.supabaseService.signOut();
    if (res?.error) return console.error('Sign out error:', res.error.message);

    this.router.navigate(['/login']);
  };
}