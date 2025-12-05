import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { ExamService, Exam } from '../services/exams.service';

@Component({
  selector: 'app-exams',
  standalone: false,
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  exams: Exam[] = [];
  errorMessage: string = '';
  currentDate: string = ''; 

  constructor(private examsService: ExamService, private router: Router) {}  

  ngOnInit() {
    this.currentDate = this.getFormattedDate(new Date());
    this.getExams();
  }

  getExams() {
    this.examsService.getExams().subscribe({
      next: (data) => {
        this.exams = data;
      },
      error: (err) => {
        console.error('Failed to fetch exams', err);
        this.errorMessage = 'Error loading exams';
      }
    });
  }

  getFormattedDate(date: Date): string {
    return date.toISOString().split('T')[0]; 
  }

  isExamAvailable(examDate: string): boolean {
    const formattedExamDate = examDate.split('T')[0];  
    const currentDate = new Date().toISOString().split('T')[0]; 
    
    console.log("Exam Date:", formattedExamDate);
    console.log("Current Date:", currentDate);
    console.log("Comparison Result:", formattedExamDate === currentDate);
    
    return formattedExamDate === currentDate;
  }

  canAttemptExam(examId: number): boolean {
    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Ensure the user has an email to use as a unique identifier
    const userEmail = user?.email;
  
    if (!userEmail) {
      console.error('User email is missing in localStorage!');
      return false;  // Prevent further checks if the user email is not found
    }
  
    // Generate a unique key for this user's exam attempt using the email
    const lastAttemptDate = localStorage.getItem(`exam-${examId}-date-${userEmail}`);
    const currentDate = this.getFormattedDate(new Date());
  
    // Check if the user has already attempted the exam today
    if (lastAttemptDate === currentDate) {
      // User already attempted the exam today
      return false;
    } else {
      // Allow the user to attempt the exam and store the attempt date
      localStorage.setItem(`exam-${examId}-date-${userEmail}`, currentDate);
      return true;
    }
  }
  
  
  startExam(examId: number) {
    if (this.canAttemptExam(examId)) {
      this.router.navigate(['/questions', examId]);
    } else {
      alert('You have already attempted this exam today!');
    }
  }
}
