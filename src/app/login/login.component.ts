import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, NgForm } from "@angular/forms";
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public authService: AuthService, private _router: Router,private fb:FormBuilder) {

    const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";

    this.loginForm = this.fb.group({
      'password' : ['', [Validators.required, Validators.minLength(8)]],
      'email' : ['', [Validators.required, Validators.pattern(PAT_EMAIL)]]
    })
  }

  ngOnInit(): void {
  }
  moveToRegister(){
    this._router.navigate(['/register']);
  }
  loginUser(user:any){
    
    this.authService.loginUser(this.loginForm.value)
       .subscribe(res => {
        console.log('result is ', res);
        if((res as {[key: string]: any})['status']){
          alert('LOGIN SUCCESSFUL');
          localStorage.setItem('token', (res as {[key: string]: any})['token']);
          this.loginForm.reset();
          this._router.navigate(['/home']);
        }
        else{
          alert('Email of password is Incorrect!');
        }
       },error=>console.error(error));
       
   }

//   username: string;
// password: string;
  // login() : void {
  //   if(this.username == 'admin' && this.password == 'admin'){
  //    this.router.navigate(["user"]);
  //   }else {
  //     alert("Invalid credentials");
  //   }
  // }

}


  // username="ADMIN"
  // password="admin"
  // getMessage() {
  //   return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  // }

  // login() {
  //   if(this.username=="ADMIN" && this.password=="admin")
  //   {
  //     alert("Login Done!!!")
  //   }
  //   else
  //   {
  //     alert("username or password is incorrect!!!")
  //   }
  //   this.message = 'Trying to log in ...';

  //   this.authService.login().subscribe(() => {
  //     this.message = this.getMessage();
  //     if (this.authService.isLoggedIn) {

  //       const redirectUrl = '/lost-item';

  //       const navigationExtras: NavigationExtras = {
  //         queryParamsHandling: 'preserve',
  //         preserveFragment: true
  //       };
  //       this.router.navigate([redirectUrl], navigationExtras);
  //     }
  //   });
  // }
  // logout() {
  //   this.authService.logout();
  //   this.message = this.getMessage();
  // }