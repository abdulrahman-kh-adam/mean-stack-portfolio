import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ISkill } from './skills.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../../../../environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  http = inject(HttpClient);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getSkills(): Observable<any> {
    return this.http.get(`${env.API_URL}/skills`);
  }

  getSkillById(id: string | null): Observable<any> {
    return this.http.get(`${env.API_URL}/skills/${id}`, {
      headers: {
        Authorization: isPlatformBrowser(this.platformId)
          ? `Bearer ${sessionStorage.getItem('token')}`
          : '',
      },
    });
  }

  addSkill(skill: ISkill): Observable<any> {
    return this.http.post(`${env.API_URL}/skills`, skill, {
      headers: {
        Authorization: isPlatformBrowser(this.platformId)
          ? `Bearer ${sessionStorage.getItem('token')}`
          : '',
      },
    });
  }

  editSkill(id: string | null, skill: ISkill): Observable<any> {
    return this.http.patch(`${env.API_URL}/skills/${id}`, skill, {
      headers: {
        Authorization: isPlatformBrowser(this.platformId)
          ? `Bearer ${sessionStorage.getItem('token')}`
          : '',
      },
    });
  }

  deleteSkill(id: string): Observable<any> {
    return this.http.delete(`${env.API_URL}/skills/${id}`, {
      headers: {
        Authorization: isPlatformBrowser(this.platformId)
          ? `Bearer ${sessionStorage.getItem('token')}`
          : '',
      },
    });
  }

  uploadImage(image: FormData): Observable<any> {
    return this.http.post(`${env.API_URL}/upload`, image, {
      headers: {
        Authorization: isPlatformBrowser(this.platformId)
          ? `Bearer ${sessionStorage.getItem('token')}`
          : '',
      },
    });
  }
}
