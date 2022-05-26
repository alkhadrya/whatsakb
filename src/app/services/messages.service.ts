import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Messages} from '../models/messages.model';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private dbPath = '/messages';

  message: AngularFireList<Messages>;

  constructor(private db: AngularFireDatabase) {
    this.message = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Messages> {
    return this.message;
  }

  create(message: Messages): any {
    return this.message.push(message);
  }

  update(key: string, value: any): Promise<void> {
    return this.message.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.message.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.message.remove();
  }

}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Messages } from '../models/messages.model';

// const baseUrl = 'http://localhost:8088/api/messages';

// @Injectable({
//   providedIn: 'root'
// })
// export class MessagesService {

//   constructor(private http: HttpClient) { }

//   getAll(): Observable<Messages[]> {
//     return this.http.get<Messages[]>(baseUrl);
//   }

//   get(id: any): Observable<any> {
//     return this.http.get(`${baseUrl}/${id}`);
//   }

//   create(data: any): Observable<any> {
//     return this.http.post(baseUrl, data);
//   }

//   update(id: any, data: any): Observable<any> {
//     return this.http.put(`${baseUrl}/${id}`, data);
//   }

//   delete(id: any): Observable<any> {
//     return this.http.delete(`${baseUrl}/${id}`);
//   }

//   deleteAll(): Observable<any> {
//     return this.http.delete(baseUrl);
//   }

//   findByTitle(title: any): Observable<Messages[]> {
//     return this.http.get<Messages[]>(`${baseUrl}?title=${title}`);
//   }
// }
