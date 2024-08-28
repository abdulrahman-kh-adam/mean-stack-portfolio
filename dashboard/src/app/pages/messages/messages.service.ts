import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  http = inject(HttpClient);

  getMessages(): Observable<any> {
    return this.http.get(`${env.API_URL}/messages`);
  }

  deleteMessage(id: string): Observable<any> {
    return this.http.delete(`${env.API_URL}/messages/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }
}
