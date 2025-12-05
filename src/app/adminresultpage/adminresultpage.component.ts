import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adminresultpage',
  standalone:false,
  templateUrl: './adminresultpage.component.html',
  styleUrls: ['./adminresultpage.component.css']
})
export class AdminresultpageComponent implements OnInit {
  results: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchResults();
  }

  fetchResults(): void {
    const apiUrl = 'http://localhost:1203/api/GetData/GetTableData?tableName=submitresult';
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.results = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load results';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
