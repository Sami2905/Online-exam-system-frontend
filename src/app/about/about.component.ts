import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about',
  standalone:false,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.animateOnScroll();
    window.addEventListener("scroll", this.animateOnScroll);
  }

  animateOnScroll() {
    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        el.classList.add("fade-in-visible");
      }
    });
  }
 
  constructor(private router: Router) {} 
  navcontact(){
    this.router.navigate(['/contact']);
  }
}
