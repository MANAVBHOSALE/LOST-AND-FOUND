import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { image } from '../user/image';
import { imageFound } from '../user/imageFound';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], 
  //encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  images : image[] = [];
  founds : imageFound[] = [];
  //private profileSubscription: Subscription;
  constructor(public authService: AuthService) { }
  searchLost : any;
  searchFound : any;
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
    this.authService.getFoundData().subscribe((data: any) => {
      console.log('Found data Got Successfully!');
        this.founds = data;
        //this.images = data;
    });
  }

}
