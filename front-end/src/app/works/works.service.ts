import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../environments';

@Injectable({
  providedIn: 'root',
})
export class WorksService {
  http = inject(HttpClient);

  getWorks(): Observable<any> {
    return this.http.get(`${env.API_URL}/works`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${env.API_URL}/workscategories`);
  }
}
