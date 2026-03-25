import { CommonModule } from '@angular/common';
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
  imports: [FormsModule, CommonModule],  // <-- FormsModule required for ngModel
  templateUrl: './history-screen.html',
  styleUrl: './history-screen.css'
})
export class HistoryScreen {
  submissions: Submission[] = [];

  constructor(private supabaseService: SupabaseService) {}
  


//i need to create a timer that goes off every second
    //i need to check the database and update the submission entries every second










 
async ngOnInit() {

   const data = await this.supabaseService.getSubmissions();

  this.submissions = data.map(row =>({
    submission: row.submission,
    trainingPartner: row.training_partner,
    position: row.position,
    result: row.result
  }))

}















  newEntry: Submission = { submission: '', trainingPartner: '', position: '', result: '' };



 async addNewEntry() {
  const supabase = this.supabaseService.getClient();

  // Map camelCase fields to snake_case for Supabase
  const insertObject = {
    submission: this.newEntry.submission,
    training_partner: this.newEntry.trainingPartner,
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