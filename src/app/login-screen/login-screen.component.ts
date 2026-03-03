import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase'; // adjust path if needed

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [],
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.from('test_table').select('*');
    console.log(data, error);
  }
}