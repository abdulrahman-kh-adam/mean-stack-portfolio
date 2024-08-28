import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  router = inject(Router);
  authService = inject(AuthService);
  skillsPath = false;
  rootPath = false;
  ngDoCheck() {
    if (
      this.router.url === '/skills' ||
      this.router.url === '/works' ||
      this.router.url === '/messages'
    ) {
      this.skillsPath = true;
    } else {
      this.skillsPath = false;
    }
    if (this.router.url === '/') {
      this.rootPath = true;
    } else {
      this.rootPath = false;
    }
    if (this.router.url !== '/') {
      if (!this.authService.checkAuth()) {
        this.router.navigate(['/']);
      }
    }
  }
  constructor() {
    if (this.router.url !== '/') {
      if (this.authService.checkAuth()) {
        this.router.navigate(['/home']);
      }
    }
  }
}
