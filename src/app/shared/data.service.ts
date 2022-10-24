import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { User } from '../modul/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }


  // add user
  addUser(user: User) {
    user.id = this.afs.createId();
    return this.afs.collection('/user').add(user);
  }

  // get  user
  getAllUser() {
    return this.afs.collection('/user').snapshotChanges();
  }

  // delete user
  deleteUser(user : User) {
     this.afs.doc('/user/'+user.id).delete();
  }

  // update student
  updateUser(user : User) {
    this.deleteUser(user);
    this.addUser(user);
  }
    
}
