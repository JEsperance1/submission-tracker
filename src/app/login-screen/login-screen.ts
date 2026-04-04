import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './login-screen.html',
  styleUrls: ['./login-screen.css'],
})
export class LoginScreen {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private supabaseService: SupabaseService,
    private router: Router, private cdr: ChangeDetectorRef
  ) {}

async signInUser() {

  const supabase = this.supabaseService.getClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: this.username,
    password: this.password
  });

  if (error) {
    console.error('Login error:', error.message);
  

    // map to safe UI message
    this.errorMessage = 'Invalid email or password';
    this.cdr.detectChanges(); 
    return;
  }

  console.log('User signed in:', data.user);
  this.router.navigate(['/dashboard']);
}

 async createUser() {
  const supabase = this.supabaseService.getClient();

  const { data, error } = await supabase.auth.signUp({
    email: this.username, // must be a real email
    password: this.password
  });

  if (error) {
    console.error('Signup error:', error.message);
  } else {
    console.log('User signed up:', data.user);

    // Optional: auto login after signup
    this.signInUser();
  }
}
}