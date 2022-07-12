import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { image } from '../user/image';
import { Subscription } from 'rxjs';
const api = '../../WT-Project-Backend/public/images/';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images : image[] = [];
  //private profileSubscription: Subscription;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    // this.authService.getProfiles();
    // this.profileSubscription = this.authService
    //   .getProfilesStream()
    //   .subscribe((image: image[]) => {
    //     this.image = image;
    //   });
    this.authService.getLostData().subscribe((data: any) => {
      console.log('Lost data Got Successfully!');
        this.images = data;
    });
  }

}
