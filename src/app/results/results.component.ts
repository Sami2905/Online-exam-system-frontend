import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-results',
  standalone:false,
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  userData: { username: string; email: string } | null = null;
  userResults: any[] = [];
  resultApiUrl = 'http://localhost:1203/api/GetData/GetTableData?tableName=submitresult';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userData = JSON.parse(storedUser);
      this.fetchUserResults();
    } else {
      console.warn('No user data found! Redirecting to login...');
    }
  }

  fetchUserResults() {
    this.http.get<any[]>(this.resultApiUrl).subscribe({
      next: (data) => {
        this.userResults = data.filter(
          result => result.username === this.userData?.username && result.email === this.userData?.email
        );
        console.log('Fetched User Results:', this.userResults);
      },
      error: (err) => console.error('Error fetching results:', err)
    });
  }
}
