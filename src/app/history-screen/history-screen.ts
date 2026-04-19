import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { SupabaseService } from '../services/supabase';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';


interface Submission {
  id: number | null;
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
    private router = inject(Router);
    editingId: number | null = null;
    originalEntry: Submission | null = null;
    searchTerm = '';
    
    


constructor(private supabaseService: SupabaseService, private cdr: ChangeDetectorRef) {}
newEntry: Submission = { id: null, submission: '', trainingPartner: '', position: '', result: '' }
newSearchTerm: string = this.searchTerm;





 
async ngOnInit() {
await this.loadSubmissions();
this.printSearchTerm();

  this.cdr.detectChanges(); 

}

async loadSubmissions() {
  this.printSearchTerm()
  const supabase = this.supabaseService.getClient();

  // get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error('Error getting current user:', userError);
    this.submissions = [];
    return;
  }


if (this.searchTerm == "") {
  // fetch only submissions for this user
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('user_id', user.id)   // filter by current user
    .order('id', { ascending: false });

  if (error) {
    console.error('Error fetching submissions:', error.message);
    this.submissions = [];
    return;
  }

  this.submissions = data.map((row: any) => ({
    id: row.id,
    submission: row.submission,
    trainingPartner: row.training_partner,
    position: row.position,
    result: row.result
  }));

  this.cdr.detectChanges();
}

else {

// fetch only submissions for this user
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .or(`submission.ilike.%${this.searchTerm}%`)
    .eq('user_id', user.id)   // filter by current user
    .order('id', { ascending: false });

  if (error) {
    console.error('Error fetching submissions:', error.message);
    this.submissions = [];
    return;
  }

  this.submissions = data.map((row: any) => ({
    id: row.id,
    submission: row.submission,
    trainingPartner: row.training_partner,
    position: row.position,
    result: row.result
  }));

  this.cdr.detectChanges();
}
}

  

printSearchTerm() {
  console.log(this.searchTerm);
}

//sign out
  logout = async () => {
    const { error } = await this.supabaseService.signOut();
    if (error) return console.error('Sign out error:', error.message);

    this.router.navigate(['/login']);
  };



  async deleteEntry(id: number) {
  try {
    await this.supabaseService.deleteSubmission(id);
    
    this.submissions = this.submissions.filter(s => s.id !== id);
    this.cdr.detectChanges();
  } catch (err) {
    console.error('Delete failed:', err);
  }
    this.cdr.detectChanges(); 
}
  

editRow(submission: Submission) {
  this.editingId = submission.id;

  // Deep copy so cancel can restore
  this.originalEntry = { ...submission };
}

async saveEntry(submission: Submission) {
  const supabase = this.supabaseService.getClient();

  const { error } = await supabase
    .from('submissions')
    .update({
      submission: submission.submission,
      training_partner: submission.trainingPartner,
      position: submission.position,
      result: submission.result
    })
    .eq('id', submission.id);

  if (error) {
    console.error('Update failed:', error.message);
    return;
  }

  this.editingId = null;
  this.originalEntry = null;
    this.cdr.detectChanges(); 

}

cancelEdit(submission: Submission) {
  if (this.originalEntry) {
    submission.submission = this.originalEntry.submission;
    submission.trainingPartner = this.originalEntry.trainingPartner;
    submission.position = this.originalEntry.position;
    submission.result = this.originalEntry.result;
  }

  this.editingId = null;
  this.originalEntry = null;
}

 async addNewEntry() {
  const supabase = this.supabaseService.getClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error('Error getting current user:', userError);
    return;
  }

  const insertObject = {
    submission: this.newEntry.submission,
    training_partner: this.newEntry.trainingPartner,
    position: this.newEntry.position,
    result: this.newEntry.result,
    user_id: user.id
  };
  


if (this.newEntry.submission == '' || this.newEntry.trainingPartner == '' || this.newEntry.position == '' || this.newEntry.result == '') {
 console.error('Error adding submission:', 'Cannot have blank entries');
}

else {

  const { data, error } = await supabase
    .from('submissions')
    .insert([insertObject])
    .select();
    

  if (error) {
    console.error('Error adding submission:', error.message);
    return;
  }

  if (data && data.length > 0) {
    const row = data[0];

    this.submissions.unshift({
      id: row.id,
      submission: row.submission,
      trainingPartner: row.training_partner,
      position: row.position,
      result: row.result
    });
  }

  this.newEntry = { id: null, submission: '', trainingPartner: '', position: '', result: '' };
    this.cdr.detectChanges(); 

}
}
}