import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './login-screen.html',
  styleUrls: ['./login-screen.css'],
})
export class LoginScreen {
  username = '';
  password = '';

  constructor(private supabaseService: SupabaseService) {}

  async createTestUser() {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase.from('users').insert([
      { username: this.username, password: this.password }
    ]);

    if (error) {
      console.error('Error creating user:', error);
    } else {
      console.log('User created:', data);
      // optionally redirect
    }
  }

  async signInUser() {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', this.username)
      .eq('password', this.password)
      .single();

    if (error) {
      console.error('Login error:', error);
    } else {
      console.log('User signed in:', data);
      // optionally redirect
    }
  }
}