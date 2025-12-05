import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-exam',
  standalone:false,
  templateUrl: './update-exam.component.html',
  styleUrls: ['./update-exam.component.css']
})
export class UpdateExamComponent {
  updateExamForm: FormGroup;
  apiUrl = 'http://localhost:1203/api/UpdateExam/UpdateValues';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.updateExamForm = this.fb.group({
      examId: ['', Validators.required],
      examName: ['', Validators.required],
      examDate: ['', Validators.required]
    });
  }

  onUpdate() {
    if (this.updateExamForm.valid) {
      const examId = this.updateExamForm.value.examId;
      const examName = this.updateExamForm.value.examName;
      const examDate = this.updateExamForm.value.examDate;
  
      // Get all exams
      const allExamsUrl = `http://localhost:1203/api/GetData/GetTableData?tableName=exam`;
  
      this.http.get<any[]>(allExamsUrl).subscribe(
        (exams) => {
          // Check if the entered details match any exam in the list
          const matchedExam = exams.find(exam =>
            exam.examid == examId 
          );
  
          if (matchedExam) {
            // Proceed to update
            const body = { ExamName: examName, ExamDate: examDate };
            const updateUrl = `${this.apiUrl}?tableName=exam&condition=examid=${examId}`;
  
            this.http.post(updateUrl, body, { responseType: 'text' }).subscribe(
              (response) => {
                console.log('Response:', response);
                alert('Exam updated successfully');
                this.updateExamForm.reset();
              },
              (error) => {
                console.error('Error updating exam:', error);
                alert('Failed to update exam.');
              }
            );
          } else {
            alert('Exam ID, Name, or Date is incorrect or does not exist.');
          }
        },
        (error) => {
          console.error('Failed to fetch exam records:', error);
          alert('Error fetching exam data.');
        }
      );
    } else {
      alert('Please fill all fields correctly.');
    }
  }
  
  
  
  
}
