import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CanComponentDeactivate } from '../guards/unsaved-changes.guard';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, CanComponentDeactivate {
  contactForm: FormGroup;
  isDirty: boolean = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.contactForm.valueChanges.subscribe(() => {
      this.isDirty = true; 
    });
  }

  get isFormValid(): boolean {
    return this.contactForm.valid;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      const emailParams = {
        name: formData.username,
        from_email: formData.email,
        message: formData.message
      };

      emailjs.send(
        'service_scqok4u',  
        'template_8s1e0vi', 
        emailParams,
        'xbQ9aTfnci6_eAsU6'  
      )
      .then(() => {
        alert('Message sent successfully!');
        console.log('Email sent:', formData);
        this.contactForm.reset();
        this.isDirty = false;
      })
      .catch(error => {
        console.error('Error sending email:', error);
        alert('Failed to send message.');
      });
    }
  }

  canDeactivate(): boolean {
    console.log('Checking if form is dirty:', this.isDirty);
    return this.isDirty
      ? confirm('You have unsaved changes. Do you really want to leave?')
      : true;
  }
}
