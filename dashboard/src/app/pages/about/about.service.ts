import { inject, Injectable } from '@angular/core';
import { IAbout } from './about.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  http = inject(HttpClient);

  getAboutInfo(): Observable<any> {
    return this.http.get(`${env.API_URL}/about`);
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${env.API_URL}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }

  updateAboutInfo(aboutInfo: IAbout): Observable<any> {
    console.log(aboutInfo.image);
    return this.http.patch(`${env.API_URL}/about`, aboutInfo, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }
}
