import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  email: string | null = null;
  apiUrl = 'http://localhost:1203/api/UpdateExam/UpdateValues';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email');
    console.log('Retrieved email:', this.email);
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const { newPassword, confirmPassword } = this.resetPasswordForm.value;

      if (newPassword !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      if (!this.email) {
        alert('Invalid email parameter!');
        return;
      }

      const condition = `email='${encodeURIComponent(this.email)}'`;
const fullUrl = `${this.apiUrl}?tableName=examregister&condition=${condition}`;

      const body = { userPassword: newPassword }; // Ensure backend expects 'Password'

      console.log('Sending request to:', fullUrl);

      this.http.post(fullUrl, body, { responseType: 'text' }).subscribe({
        next: (response) => {
          console.log('Success Response:', response);
          alert('Password updated successfully!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error updating password:', error);
          alert('Failed to update password. Try again.');
        }
      });
    }
  }
}
