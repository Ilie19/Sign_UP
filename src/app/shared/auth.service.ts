import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Route, Router } from '@angular/router';
import { Auth, GoogleAuthProvider} from '@angular/fire/auth'
import { getAuth } from 'firebase/auth';
import { deleteUser } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor( private fireauth : AngularFireAuth, private router:Router) { }

  // login 
  login( email : string,  password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('token','true');
        this.sendEmailForVarification(res.user);
        if(res.user?.emailVerified == true) {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['/varify-email']);
        }

    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }

  // register 
  register(first_name:string,last_name:string,email : string, mobile:string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registration Successful');
    
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }
  
  

  // sign out
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }  

// forgot password
forgotPassword(email : string) {
  this.fireauth.sendPasswordResetEmail(email).then(() => {
    this.router.navigate(['/varify-email']);
  }, err => {
    alert('Something went wrong');
  })
}

 // email varification
 sendEmailForVarification(user : any) {
  console.log(user);
  user.sendEmailVerification().then((res : any) => {
    this.router.navigate(['/varify-email']);
  }, (err : any) => {
    alert('Something went wrong. Not able to send mail to your email.')
  })
}


  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }
 

}

