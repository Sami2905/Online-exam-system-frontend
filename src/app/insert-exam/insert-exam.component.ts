import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-insert-exam',
  standalone: false,
  templateUrl: './insert-exam.component.html',
  styleUrls: ['./insert-exam.component.css']
})
export class InsertExamComponent {
  examForm: FormGroup;
  apiUrl = 'http://localhost:1203/api/InsertExam/InsertValues?tableName=exam';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.examForm = this.fb.group({
      examId: ['', [Validators.required, Validators.pattern("^[0-9]+$")]], 
      examName: ['', [Validators.required]],
      examDate: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.examForm.valid) {
      const formValues = this.examForm.value;
      
      const requestPayload = {
        attributes: ["examId", "examName", "examDate"],
        values: [
          [`${formValues.examId}`],
          [formValues.examName],
          [formValues.examDate]
        ]
      };

      this.http.post(this.apiUrl, requestPayload, { responseType: 'text' }).subscribe(
        response => {
          console.log('Success:', response);
          
          if (response && response.trim().length > 0) {
            alert('Exam Created Successfully!');
            this.examForm.reset();
          } else {
            alert('Exam Creation Failed!');
          }
        },
        error => {
          console.error('Error:', error);
          alert('Exam Creation Failed!');
        }
      );
    }
  }
}
