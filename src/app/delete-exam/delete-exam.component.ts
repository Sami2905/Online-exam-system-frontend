import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-delete-exam',
  standalone: false,
  templateUrl: './delete-exam.component.html',
  styleUrls: ['./delete-exam.component.css']
})
export class DeleteExamComponent {
  examId: number | null = null;
  apiUrl = 'http://localhost:1203/api/DeleteRecord/DeleteValues';

  constructor(private http: HttpClient) {}

  deleteExam() {
    if (!this.examId) {
      alert('Please enter a valid Exam ID');
      return;
    }
  
    // Fetch all exams
    const getAllExamsUrl = 'http://localhost:1203/api/GetData/GetTableData?tableName=exam';
  
    this.http.get<any[]>(getAllExamsUrl).subscribe(
      (exams) => {
        // Check if entered examId exists
        const exists = exams.some(exam => exam.examid == this.examId);
  
        if (exists) {
          // Proceed to delete
          const params = new HttpParams()
            .set('tableName', 'exam')
            .set('condition', `examid=${this.examId}`);
  
          this.http.delete(this.apiUrl, { params, responseType: 'text' }).subscribe({
            next: (response) => {
              console.log('API Response:', response);
              alert('Exam deleted successfully!');
              this.examId = null;
            },
            error: (err) => {
              alert('Error deleting exam.');
              console.error(err);
            }
          });
        } else {
          alert(`Exam with ID ${this.examId} does not exist.`);
        }
      },
      (error) => {
        console.error('Failed to fetch exam list:', error);
        alert('Error fetching exam data.');
      }
    );
  }
  
}
