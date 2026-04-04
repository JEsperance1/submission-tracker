import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  async getSession() {
    return await this.supabase.auth.getSession();
  }

    async signOut() {
  return await this.supabase.auth.signOut(); // now returns { error }
}
  async getSubmissions() {
    const { data, error } = await this.supabase
      .from('submissions')
      .select('*');

    if (error) {
      console.error(error);
      return [];
    }

    return data;
  }
  async deleteSubmission(id: number) {
  const { error } = await this.supabase
    .from('submissions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Delete error:', error.message);
    throw new Error(error.message); 
  }

  return true;
}

  getClient() {
    return this.supabase;
  }


}