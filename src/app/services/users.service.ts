import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { User } from '../models/users.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';

  user: AngularFireList<User>;

  constructor(private db: AngularFireDatabase) {
    this.user = db.list(this.dbPath);
  }

  getAll(): AngularFireList<User> {
    return this.user;
  }

  create(user: User): any {
    return this.user.push(user);
  }

  update(key: string, value: any): Promise<void> {
    return this.user.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.user.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.user.remove();
  }

}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { User } from '../models/users.model';

// const baseUrl = 'http://localhost:8088/api/users';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   constructor(private http: HttpClient) { }

//   getAll(): Observable<User[]> {
//     return this.http.get<User[]>(baseUrl);
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

//   findByTitle(title: any): Observable<User[]> {
//     return this.http.get<User[]>(`${baseUrl}?title=${title}`);
//   }
// }
