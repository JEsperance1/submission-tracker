import { Component } from '@angular/core';
import { SupabaseService } from '../services/supabase';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface Submission {
  submission: string;
  trainingPartner: string;
  position: string;
  result: string;
}

@Component({
  selector: 'app-history-screen',
  standalone: true,
  imports: [FormsModule, RouterOutlet],  // <-- FormsModule required for ngModel
  templateUrl: './history-screen.html',
  styleUrl: './history-screen.css'
})
export class HistoryScreen {
  // Preexisting submissions
  submissions: Submission[] = [
    { submission: 'Armbar', trainingPartner: 'Gary', position: 'Mount', result: 'Success' },
    { submission: 'RNC', trainingPartner: 'Jeff', position: 'Back', result: 'Success' },
    { submission: 'Triangle', trainingPartner: 'Joe', position: 'Guard', result: 'Failed' },
  ];

  // The top blank row
  newEntry: Submission = { submission: '', trainingPartner: '', position: '', result: '' };

  constructor(private supabaseService: SupabaseService) {}

 async addNewEntry() {
  const supabase = this.supabaseService.getClient();

  // Map camelCase fields to snake_case for Supabase
  const insertObject = {
    submission: this.newEntry.submission,
    training_partner: this.newEntry.trainingPartner, // map here
    position: this.newEntry.position,
    result: this.newEntry.result
  };

  // Insert into Supabase
  const { data, error } = await supabase.from('submissions').insert([insertObject]);

  if (error) {
    console.error('Error adding submission:', error.message);
    return;
  }

  console.log('Submission added:', data);

  // Add it to the table locally
  this.submissions.unshift({ ...this.newEntry });

  // Reset the top blank row
  this.newEntry = { submission: '', trainingPartner: '', position: '', result: '' };
}
}