import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { env } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      if (!sessionStorage.getItem('token')) {
        sessionStorage.setItem('token', 'null');
      }
    }
  }

  checkAuth() {
    let token!: string | null;
    if (isPlatformBrowser(this.platformId)) {
      token = sessionStorage.getItem('token');
    }
    if (token === 'null') {
      return false;
    } else {
      return true;
    }
  }

  signin(name: string, password: string): Observable<any> {
    return this.http.post<any>(`${env.API_URL}/auth/login`, {
      name,
      password,
    });
  }
}
