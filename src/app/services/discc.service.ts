import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../models/users.model';
@Injectable({
  providedIn: 'root'
})
export class myService {
  private dbPath = '/users';
  usersRef: AngularFireList<User>;
  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<User> {
    return this.usersRef;
  }
  create(user: User): any {
    return this.usersRef.push(user);
  }
  update(key: string, value: any): Promise<void> {
    return this.usersRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.usersRef.remove(key);
  }
  deleteAll(): Promise<void> {
    return this.usersRef.remove();
  }
}