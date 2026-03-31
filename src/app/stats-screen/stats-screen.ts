import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase';

@Component({
  selector: 'app-stats-screen',
  imports: [CommonModule],
  templateUrl: './stats-screen.html',
  styleUrls: ['./stats-screen.css'], // fixed
})
export class StatsScreen {

  private router = inject(Router);

  constructor(private supabaseService: SupabaseService) {}

  logout = async () => {
    const res = await this.supabaseService.signOut();
    if (res?.error) return console.error('Sign out error:', res.error.message);

    this.router.navigate(['/login']);
  };
}