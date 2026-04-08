import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase';

interface StatItem {
  submission: string;
  count: number;
}

@Component({
  selector: 'app-stats-screen',
  standalone: true, // ✅ REQUIRED for standalone components
  imports: [CommonModule],
  templateUrl: './stats-screen.html',
  styleUrls: ['./stats-screen.css'],
})
export class StatsScreen implements OnInit {

  private router = inject(Router);

  constructor(private supabaseService: SupabaseService, private cdr: ChangeDetectorRef) {}

  // STATE
  submissionStats: StatItem[] = [];
  submissions: any[] = [];
  displayedSubmissions: any[] = [];
  colors = [
    '#4caf50', '#f44336', '#ff9800', '#2196f3', '#9c27b0',
    '#00bcd4', '#e91e63', '#8bc34a', '#ffc107', '#795548'
  ];
  pieChartStyle = '';

  async ngOnInit() {
    // Load only submissions for current user
    await this.loadSubmissions();

    // GROUP DATA for pie chart
    const map = new Map<string, number>();
    this.submissions.forEach((row: any) => {
      const key = row.submission;
      map.set(key, (map.get(key) || 0) + 1);
    });

    this.submissionStats = Array.from(map.entries()).map(([submission, count]) => ({
      submission,
      count
    }));

    this.buildPieChart();
  }

  async loadSubmissions() {
    const supabase = this.supabaseService.getClient();

    // Get current logged-in user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('Error getting current user:', userError);
      this.submissions = [];
      return;
    }

    // Fetch submissions only for this user
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('user_id', user.id)
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching submissions:', error);
      this.submissions = [];
      return;
    }

    this.submissions = data.map((row: any) => ({
      id: row.id,
      submission: row.submission,
      trainingPartner: row.training_partner,
      position: row.position,
      result: row.result
    }));

    this.displayedSubmissions = this.submissions.slice(0, 5);
    this.cdr.detectChanges();
  }

  logout = async () => {
    const res = await this.supabaseService.signOut();
    if (res?.error) return console.error('Sign out error:', res.error.message);

    this.router.navigate(['/login']);
  };

  buildPieChart() {
    if (!this.submissionStats.length) return;

    const total = this.submissionStats.reduce((sum, s) => sum + s.count, 0);
    let start = 0;
    const segments: string[] = [];

    this.submissionStats.forEach((item, i) => {
      const percent = (item.count / total) * 100;
      const end = start + percent;
      const color = this.colors[i % this.colors.length];
      segments.push(`${color} ${start}% ${end}%`);
      start = end;
    });

    this.pieChartStyle = `conic-gradient(${segments.join(',')})`;
    this.cdr.detectChanges();
  }
}