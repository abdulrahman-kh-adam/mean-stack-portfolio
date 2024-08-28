import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  router = inject(Router);
  title = 'front-end';
  projectsPath = false;
  ngDoCheck() {
    if (this.router.url === '/works') {
      this.projectsPath = true;
    } else {
      this.projectsPath = false;
    }
  }
}
