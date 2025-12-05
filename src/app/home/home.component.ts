import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData: { username: string; email: string; admin?: boolean } | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkUserLogin();
  }

  checkUserLogin() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userData = JSON.parse(storedUser);
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
