import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  alert : boolean = false
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }
  registerUser(user: any){
    this.authService.registerUser(user);
  }
  closeAlert(){
    this.alert = false
  }
}
