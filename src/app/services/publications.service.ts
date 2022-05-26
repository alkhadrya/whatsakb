import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publications } from '../models/publications.model';

const baseUrl = 'http://localhost:8088/api/publications';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Publications[]> {
    return this.http.get<Publications[]>(baseUrl);
  }

  get(id: any): Observable<Publications> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Publications[]> {
    return this.http.get<Publications[]>(`${baseUrl}?title=${title}`);
  }
}
