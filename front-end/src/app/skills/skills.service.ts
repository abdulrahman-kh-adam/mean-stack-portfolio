import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../environments';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  http = inject(HttpClient);

  getSkills(): Observable<any> {
    return this.http.get(`${env.API_URL}/skills`);
  }
}
