import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-questions',
  standalone:false,
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  examId!: number;
  examQuestions: any[] = [];
  questionsForm!: FormGroup;
  totalScore: number = 0;
  examName: string = '';
  userData: { username: string; email: string } | null = null;

  apiUrl = 'http://localhost:1203/api/GetData/GetTableData?tableName=question';
  resultApiUrl = 'http://localhost:1203/api/InsertExam/InsertValues?tableName=submitresult';

  // Timer
  timeLeft: number = 600; // 10 minutes
  timerDisplay: string = "10:00"; // Initial display
  timerInterval: any;

  // Tab Switch Restriction
  tabSwitchCount: number = 0;
  isSubmitted: boolean = false; // Flag to track manual submission

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userData = JSON.parse(storedUser);
    } else {
      console.warn('No user data found! Redirecting to login...');
      this.router.navigate(['/login']);
      return;
    }

    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.examQuestions = data.filter(q => q.examid === this.examId);
        this.initForm();
      },
      error: (err) => console.error('Error fetching exam details:', err)
    });

    const examApiUrl = 'http://localhost:1203/api/GetData/GetTableData?tableName=exam';
    this.http.get<any[]>(examApiUrl).subscribe({
      next: (examData) => {
        const exam = examData.find(e => e.examid === this.examId);
        this.examName = exam ? exam.examname : 'Unknown Exam';
        console.log('Fetched Exam Name:', this.examName);
      },
      error: (err) => console.error('Error fetching exam name:', err)
    });

    // Start countdown timer
    this.startTimer();

    // Listen for tab switch
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0 && !this.isSubmitted) { // Only countdown if not submitted
        this.timeLeft--;
        this.updateTimerDisplay();
      } else {
        clearInterval(this.timerInterval); // Stop timer if submitted
        if (this.timeLeft === 0 && !this.isSubmitted) {
          this.submitResult(); // Auto-submit when timer reaches 0 if not manually submitted
        }
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.timerDisplay = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  initForm() {
    const answerControls: { [key: string]: FormControl } = {};

    this.examQuestions.forEach(question => {
      answerControls[`${question.question_id}`] = new FormControl('');
    });

    this.questionsForm = this.fb.group({
      answers: this.fb.group(answerControls)
    });

    console.log('Form Initialized:', this.questionsForm.value);
  }

  calculateScore() {
    this.totalScore = 0;
    const answers = this.questionsForm.value.answers;
    console.log('Selected Answers:', answers);

    this.examQuestions.forEach(question => {
      const selectedAnswer = answers[question.question_id];
      if (selectedAnswer && selectedAnswer === question.correct_option) {
        this.totalScore++;
      }
    });

    console.log('Total Score:', this.totalScore);
  }

  submitResult() {
    if (this.isSubmitted) return; // Prevent submission if already submitted

    this.isSubmitted = true; // Set the flag to true
    clearInterval(this.timerInterval); // Stop timer when submitted manually
    this.calculateScore();

    const requestPayload = {
      request: 'submitresult',
      attributes: ['username', 'email', 'examname', 'score'],
      values: [
        [this.userData?.username ?? 'Unknown'],
        [this.userData?.email ?? 'Unknown'],
        [this.examName ?? 'Unknown Exam'],
        [String(this.totalScore)]
      ]
    };

    console.log('Submitting result:', JSON.stringify(requestPayload, null, 2));

    this.http.post(this.resultApiUrl, requestPayload, { responseType: 'text' }).subscribe(
      response => {
        console.log('Success:', response);
        if (response && response.trim().length > 0) {
          setTimeout(() => {
            alert('Your exam is submitted!');
            setTimeout(() => {
              this.router.navigate(['/exams']); // Delay navigation to ensure alert is seen
            }, 500);
          }, 100);
        } else {
          alert('Submission Failed!');
        }
      },
      error => {
        console.error('Error submitting result:', error);
        alert('Submission Failed!');
      }
    );
  }

  handleVisibilityChange() {
    if (this.isSubmitted) return; // Prevent tab-switch logic if already submitted

    if (document.hidden) {
      this.tabSwitchCount++;

      if (this.tabSwitchCount === 1) {
        setTimeout(() => {
          alert('Warning: You have switched tabs once. Switching again may result in auto-submission.');
        }, 100);
      } else if (this.tabSwitchCount === 2) {
        setTimeout(() => {
          alert('Warning: This is your second tab switch. One more and your exam will be submitted!');
        }, 100);
      } else if (this.tabSwitchCount === 3) {
        setTimeout(() => {
          alert('Your exam is submitted due to exceeding tab switches!');
          this.submitResult(); // Auto-submit the exam if tab switches exceed limit
        }, 100);
      }
    }
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval); // Clear the timer if user navigates 
    document.removeEventListener('visibilitychange', this.handleVisibilityChange.bind(this)); // Remove event listener
  }
}
