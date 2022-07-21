import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  alert : boolean = false
  constructor(private authService : AuthService,  private _router: Router) { }

  ngOnInit(): void {
  }
  contactUser(user: any){
    this.authService.contactUser(user);
    this._router.navigate(['/home']);
    this.alert = true;
  }
  closeAlert(){
    this.alert = false
  }
}
