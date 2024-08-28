import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../environments';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  http = inject(HttpClient);

  getHomeInfo(): Observable<any> {
    return this.http.get(`${env.API_URL}/home`);
  }
}
