import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  apiUrl = 'http://localhost:1203/api/InsertExam/InsertValues?tableName=examregister';


  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      qualification: ['', [Validators.required]],
      userpassword: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/)
      ]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
  
      const requestPayload = {
        attributes: ["username", "email", "qualification", "userpassword"],
        values: [
          [formValues.username],
          [formValues.email],
          [formValues.qualification],
          [formValues.userpassword]
        ]
      };
  
      this.http.post(this.apiUrl, requestPayload, { responseType: 'text' }).subscribe(
        response => {
          console.log('Success:', response);
          
          
          if (response && response.trim().length > 0) {
            alert('Registration Successful!');
            this.router.navigate(['/login']);
          } else {
            alert('Registration Failed!');
          }
        },
        error => {
          console.error('Error:', error);
          alert('Registration Failed!');
        }
      );
    }
  }
  
  get userpassword() {
    return this.registerForm.get('userpassword');
  }
}
