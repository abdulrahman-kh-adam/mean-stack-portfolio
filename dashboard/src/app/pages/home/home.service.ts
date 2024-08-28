import { inject, Injectable } from '@angular/core';
import { IHome } from './home.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  http = inject(HttpClient);

  getHomeInfo(): Observable<any> {
    return this.http.get<any>(`${env.API_URL}/home`);
  }

  uploadHomeInfo(homeInfo: IHome): Observable<any> {
    return this.http.patch(`${env.API_URL}/home`, homeInfo, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }
}
