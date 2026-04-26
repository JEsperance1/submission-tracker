import { Component, OnInit } from '@angular/core';
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

  async ngOnInit() {
      this.fetchSomeDataForTable();
      }



    ///makes a call to sql for some data
    async fetchSomeDataForTable() {
      const {data, error} = await this.supabaseService.supabase.from('submissions').select('*');
      for
    }














   logout = async () => {
    const res = await this.supabaseService.signOut();
    if (res?.error) return console.error('Sign out error:', res.error.message);

    this.router.navigate(['/login']);
  };

}
