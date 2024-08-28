import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMessage } from './contact.model';
import { Observable } from 'rxjs';
import { env } from '../../../environments';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  http = inject(HttpClient);

  sendMessage(message: IMessage): Observable<any> {
    return this.http.post(`${env.API_URL}/messages`, message);
  }
}
