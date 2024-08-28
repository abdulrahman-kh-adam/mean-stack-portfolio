import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  loginForm!: FormGroup;
  router = inject(Router);
  failMessage = false;
  authService = inject(AuthService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    if (this.authService.checkAuth()) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    const name = this.loginForm.value.username;
    const pass = this.loginForm.value.password;
    this.authService.signin(name, pass).subscribe(
      (res) => {
        if (res.status === 'success') {
          if (isPlatformBrowser(this.platformId)) {
            sessionStorage.setItem('token', res.token);
            this.router.navigate(['/home']);
          }
        }
      },
      (error) => {
        this.failMessage = true;
      }
    );
  }
}
