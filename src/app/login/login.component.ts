import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;

  constructor(public authService: AuthService, public router: Router) {
    this.message = this.getMessage();
  }
  ngOnInit(): void {
  }

  username="ADMIN"
  password="admin"
  getMessage() {
    return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    if(this.username=="ADMIN" && this.password=="admin")
    {
      alert("Login Done!!!")
    }
    else
    {
      alert("username or password is incorrect!!!")
    }
    this.message = 'Trying to log in ...';

    this.authService.login().subscribe(() => {
      this.message = this.getMessage();
      if (this.authService.isLoggedIn) {

        const redirectUrl = '/lost-item';

        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };
        this.router.navigate([redirectUrl], navigationExtras);
      }
    });
  }
  logout() {
    this.authService.logout();
    this.message = this.getMessage();
  }
}