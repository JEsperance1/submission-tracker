import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }
//fetch submissions method
 async getSubmissions() {
  const { data, error } = await this.supabase
  .from('submissions')
  .select('*');

  //error response handling
  if (error) {
    console.error(error)
    return [];
  }
  return data;
 }





  getClient() {
    return this.supabase;
  }
}