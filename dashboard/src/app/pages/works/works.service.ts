import { inject, Injectable } from '@angular/core';
import { IWork } from './works.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class WorksService {
  http = inject(HttpClient);

  getWorks(): Observable<any> {
    return this.http.get(`${env.API_URL}/works`);
  }

  getWorkById(id: string | null): Observable<any> {
    return this.http.get(`${env.API_URL}/works/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }

  addWork(work: IWork): Observable<any> {
    return this.http.post(`${env.API_URL}/works`, work, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }

  editWork(id: string | null, work: IWork): Observable<any> {
    return this.http.patch(`${env.API_URL}/works/${id}`, work, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }

  deleteWork(id: string): Observable<any> {
    return this.http.delete(`${env.API_URL}/works/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }

  getWorksCategories(): Observable<any> {
    return this.http.get(`${env.API_URL}/workscategories`);
  }

  getWorksCategory(id: string | null): Observable<any> {
    return this.http.get(`${env.API_URL}/workscategories/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }

  createWorksCategory(catName: string): Observable<any> {
    return this.http.post(
      `${env.API_URL}/workscategories`,
      { name: catName },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      }
    );
  }

  updateWorksCategory(id: string | null, catName: string): Observable<any> {
    return this.http.patch(
      `${env.API_URL}/workscategories/${id}`,
      {
        name: catName,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      }
    );
  }

  deleteWorksCategory(id: string | null): Observable<any> {
    return this.http.delete(`${env.API_URL}/workscategories/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }

  uploadImage(img: FormData): Observable<any> {
    return this.http.post(`${env.API_URL}/upload`, img, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }
}
