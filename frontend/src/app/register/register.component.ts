import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  alert : boolean = false
  constructor(private authService : AuthService,  private _router: Router) { }

  ngOnInit(): void {
  }
  registerUser(user: any){
    this.authService.registerUser(user);
    this._router.navigate(['/login']);
    this.alert = true;
  }
  closeAlert(){
    this.alert = false
  }
}
