import { Component } from '@angular/core';
import { SupabaseService } from '../services/supabase';
import { Routes, Router } from '@angular/router';


@Component({
  selector: 'app-new-data-screen',
  imports: [],
  templateUrl: './new-data-screen.html',
  styleUrl: './new-data-screen.css',
})
export class NewDataScreen {


  constructor(private supabaseService: SupabaseService, private router: Router)
  {}
    ///makes a call to sql for some data
    fetchSomeDataForTable() {
      console.log(this.supabaseService.supabase.from('submissions').select('*'));




    }














   logout = async () => {
    const res = await this.supabaseService.signOut();
    if (res?.error) return console.error('Sign out error:', res.error.message);

    this.router.navigate(['/login']);
  };

}
