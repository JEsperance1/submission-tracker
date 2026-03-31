import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase';

@Component({
  selector: 'app-profile-screen',
  imports: [CommonModule],
  templateUrl: './profile-screen.html',
  styleUrls: ['./profile-screen.css'], // fixed from styleUrl
})
export class ProfileScreen {

  private router = inject(Router);

  constructor(private supabaseService: SupabaseService) {}

  logout = async () => {
    const res = await this.supabaseService.signOut();
    if (res?.error) return console.error('Sign out error:', res.error.message);

    this.router.navigate(['/login']);
  };
}