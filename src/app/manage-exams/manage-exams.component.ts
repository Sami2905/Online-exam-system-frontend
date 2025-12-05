import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-exams',
  standalone: false,
  templateUrl: './manage-exams.component.html',
  styleUrls: ['./manage-exams.component.css']
})
export class ManageExamsComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
