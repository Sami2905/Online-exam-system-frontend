import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  apiUrl = 'http://localhost:1203/api/GetData/GetTableData?tableName=examregister';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendResetLink() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      console.log('Entered email:', email);
  
      // Check if email exists in database
      this.http.get<any[]>(this.apiUrl).subscribe({
        next: (users) => {
          console.log('Fetched users:', users);
          const user = users.find(u => u.email === email);
  
          if (user) {
            console.log(' Email found in database:', email);
  
            // Send reset email
            const resetLink = `http://localhost:4200/reset-password?email=${encodeURIComponent(email)}`;
            console.log('Generated Reset Link:', resetLink);
  
            const emailParams = {
              to_email: email,
              reset_link: resetLink
            };
  
            emailjs.send('service_tr0oluu', 'template_jy2wubp', emailParams, 'xbQ9aTfnci6_eAsU6')
              .then(() => {
                console.log('Email sent successfully');
                alert('Password reset link sent to your email.');
              })
              .catch((error) => {
                console.error(' Error sending email:', error);
                alert('Failed to send email. Try again later.');
              });
          } else {
            console.warn('Email not found in database.');
            alert('Email not found.');
          }
        },
        error: (error) => {
          console.error(' Error fetching users:', error);
          alert('Error verifying email.');
        }
      });
    } else {
      alert('Please enter a valid email.');
    }
  }
  
}
