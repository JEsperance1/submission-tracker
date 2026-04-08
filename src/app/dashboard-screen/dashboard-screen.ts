import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase';

interface Submission {
  submission: string;
  trainingPartner: string;
  position: string;
  result: string;
  successPct?: number;
}

@Component({
  selector: 'app-dashboard-screen',
  imports: [CommonModule],
  templateUrl: './dashboard-screen.html',
  styleUrls: ['./dashboard-screen.css'],
})
export class DashboardScreen implements OnInit, OnDestroy {

  submissions: Submission[] = [];
  displayedSubmissions: Submission[] = [];
  intervalId: any;
  successPct = 0.0;

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

  queryForSuccessPct() {
    this.loadSubmissions();
    const total = this.submissions.length;
    const successes = this.submissions.filter(s => s.result.toLowerCase() === 'success').length;
    this.successPct = successes / total * 100;
  }

  getChartGradient(): string {
    this.queryForSuccessPct();
  return `conic-gradient(
    #4caf50 0% ${this.successPct}%,
    #f44336 ${this.successPct}% 100%
  )`;
}
async loadSubmissions() {
  const supabase = this.supabaseService.getClient();

  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error('Error getting current user:', userError);
    this.submissions = [];
    this.displayedSubmissions = [];
    return;
  }

  // Fetch submissions for the current user
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('user_id', user.id) 
    .order('id', { ascending: false });

  if (error) {
    console.error('Error fetching submissions:', error);
    this.submissions = [];
    this.displayedSubmissions = [];
    return;
  }

  // Map the results to the Submission interface
  this.submissions = data.map((row: any) => ({
    submission: row.submission,
    trainingPartner: row.training_partner,
    position: row.position,
    result: row.result,
  }));

  // Keep only the first 5 submissions for display
  this.displayedSubmissions = this.submissions.slice(0, 5);
}

  logout = async () => {
    const res = await this.supabaseService.signOut();
    if (res?.error) return console.error('Sign out error:', res.error.message);

    this.router.navigate(['/login']);
  };
}