

import { Component, OnInit } from '@angular/core';
import { User } from '../modul/user';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  showAdd!:boolean;
  showUpdate!:boolean;
  id: string = '';
  First_name: string = '';
  Last_name: string = '';
  Email: string = '';
  Mobile: string = '';
  Password:string='';
  
  first_name = this.First_name;
  last_name = this.Last_name;
  email =this.Email;
  mobile=this.Mobile;
  password:string='';

  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  register() {

    if(this.First_name== '') {
      alert('Please enter email');
      return;
    }

    if(this.Last_name == '') {
      alert('Please enter email');
      return;
    }


    if(this.Email == '') {
      alert('Please enter email');
      return;
    }

    if(this.Mobile == '') {
      alert('Please enter email');
      return;
    }

    if(this.Password == '') {
      alert('Please enter password');
      return;
    }
   

    
    this.auth.register(this.First_name,this.Last_name,this.Email,this.Mobile,this.Password);
    console.log(this.register)
  
    
    this.First_name='';
    this.Last_name='';
    this.Email = '';
    this.Mobile='';
    this.Password = '';

  }
  
  
  clickAddEmpliye(){
    
    this.showAdd=true;
    this.showUpdate=false; 
  }



  userList: User[]=[]
  userObj: User = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: ''
  };
  

  

 

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
    this.id = this.id;
    this.first_name = this.First_name;
    this.last_name = this.Last_name;
    this.email = this.Email;
    this.mobile = this.Mobile;
  }

  adduser() {
    this.showAdd=false;
    this.showUpdate=true; 
    if (this.first_name == '' || this.last_name == '' || this.mobile == '' || this.email == '') {
      alert('Fill all input fields');
      return;
    }

    this.userObj.id = '';
    this.userObj.email = this.Email;
    this.userObj.first_name = this.First_name;
    this.userObj.last_name = this.Last_name;
    this.userObj.mobile = this.Mobile;

    this.data.addUser(this.userObj);
    this.resetForm();
    


  }


  updateuser() {

  }

   

  
add(){
  this.register()
  this.adduser();

  this.resetForm();
  
 
  }

  
}











