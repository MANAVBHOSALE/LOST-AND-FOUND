import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder } from "@angular/forms";
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-found-item',
  templateUrl: './found-item.component.html',
  styleUrls: ['./found-item.component.css']
})
export class FoundItemComponent implements OnInit {
  alert : boolean = false
  lostForm!: FormGroup;
  preview: string | undefined;
  fileInputLabel: string | undefined;
  constructor(public authService: AuthService, private http : HttpClient, private _router: Router,private fb:FormBuilder) { 
    this.lostForm = this.fb.group({
      itemname : '',
      question:'',
      type:'',
      url : '',
      
    });
  }

  ngOnInit(): void {
  }
  upload(event: any) {
  const file = event.target.files[0];
    this.lostForm.patchValue({
      url: file
    });
    this.lostForm.get('url')!.updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  onFormSubmit() {
    this.authService.addfound(
      this.lostForm.value.itemname,
      this.lostForm.value.question,
      this.lostForm.value.type,
      this.lostForm.value.url
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        // case HttpEventType.UploadProgress:
        //   this.percentDone = Math.round(event.loaded / event.total * 100);
        //   console.log(`Uploaded! ${this.percentDone}%`);
        //   break;
        case HttpEventType.Response:
          console.log('Lost data has been created!', event.body);
          //this.percentDone = false;
          this._router.navigate(['/home']);
      }
    })
  }
}
