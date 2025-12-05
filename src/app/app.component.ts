import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'online-exam-system';
  userData: { username: string; email: string; admin?: boolean } | null = null;
  isAdmin: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkUserLogin();
    this.checkUserStatus(); 
  }

  checkUserLogin() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userData = JSON.parse(storedUser);
    }
  }

  checkUserStatus() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('User from localStorage:', user);
    this.isAdmin = user.admin === true; 
    console.log('isAdmin value:', this.isAdmin);
  }

  logout() {
    const confirmLogout = confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('user');
      this.isAdmin = false;
      this.userData = null; 
      this.router.navigate(['/login']); 
    }
  }
}
