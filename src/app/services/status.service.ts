import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from '../models/status.model';

const baseUrl = 'http://localhost:8088/api/status';

@Injectable({
  providedIn: 'root'
})
export class StatuService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Status[]> {
    return this.http.get<Status[]>(baseUrl);
  }

  get(id: any): Observable<any> {
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

  findByTitle(title: any): Observable<Status[]> {
    return this.http.get<Status[]>(`${baseUrl}?title=${title}`);
  }
}
