import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  apiUrl = 'http://localhost:1203/api/GetData/GetTableData?tableName=examregister'; 
  users: { email: string, userpassword: string, username: string }[] = []; 

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Updated field
      userpassword: ['', Validators.required]
    });

    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('API Response:', data);
        this.users = data.map(user => ({
          email: user.email, 
          userpassword: user.userpassword,
          username: user.username 
        }));
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, userpassword } = this.loginForm.value;
  
      const matchedUser = this.users.find(user =>
        user.email === email && user.userpassword === userpassword
      );
  
      if (matchedUser) {
        let userObject: { username: string; email: string; admin?: boolean } = {
          username: matchedUser.username,
          email: matchedUser.email
        };
  
        if (email === 'admin7002@gmail.com' && userpassword === 'Admin7002!') {
          userObject.admin = true;
        }
  
        console.log('User being stored:', userObject);
        localStorage.setItem('user', JSON.stringify(userObject));
  
        alert('Login Successful!');
        this.router.navigate(['/home']).then(() => {
          window.location.reload(); 
        });
      } else {
        alert('Invalid email or password.');
      }
    }
  }
}
