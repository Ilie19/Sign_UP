import { Component, OnInit } from '@angular/core';
import { User } from '../modul/user';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userList: User[]=[]
  userObj: User = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: ''
  };
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  mobile: string = '';

  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  

  getAllUser() {

    this.data.getAllUser().subscribe(res => {

      this.userList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching user data');
    })

  }

  resetForm() {
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.mobile = '';
  }

  
  updateuser() {

  }

  deleteuser(user: User) {
    if (window.confirm('Are you sure you want to delete ' + user.first_name + ' ' + user.last_name + ' ?')) {
      this.data.deleteUser(user);
    }
  }

}
