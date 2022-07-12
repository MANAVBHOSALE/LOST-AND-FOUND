import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder } from "@angular/forms";
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-lost-item',
  templateUrl: './lost-item.component.html',
  styleUrls: ['./lost-item.component.css']
})
/** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }
export class LostItemComponent implements OnInit {
  //@ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  alert : boolean = false
  lostForm!: FormGroup;
  preview: string | undefined;
  fileInputLabel: string | undefined;
  constructor(public authService: AuthService, private http : HttpClient, private _router: Router,private fb:FormBuilder) { 
    this.lostForm = this.fb.group({
      email:'',
      mobile_no:'',
      itemname : '',
      description:'',
      question:'',
      type:'',
      url : '',
      
    });
  }
  //itemname = '';
  //isLoadingResults = false;
  ngOnInit(): void {
  }
  upload(event: any) {
    // const file = event.target.files[0];

    // const formdata = new FormData();
    // formdata.append('file', file);

    // this.http.post('http://localhost:4000/file', formdata).subscribe(
    //   (d) => {
    //     console.log(d);
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
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
    this.authService.addlost(
      this.lostForm.value.email,
      this.lostForm.value.mobile_no,
      this.lostForm.value.itemname,
      this.lostForm.value.description,
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
  // onFileSelect(event: { target: { files: any[]; }; }) {
  //   const file = event.target.files[0];
  //   this.fileInputLabel = file.itemname;
  //   this.lostForm.get('itemimage').setValue(file);
  // }
  // onFormSubmit(): void {
  //   if (!this.lostForm.get('itemimage').value) {
  //     alert('Please fill valid details!');
  //     return false;
  //   }

  //   const formData = new FormData();
  //   formData.append('uploadedImage', this.lostForm.get('uploadedImage').value);
  //   formData.append('agentId', '007');

  //   this.http
  //     .post<any>('http://localhost:3000/lost', formData).subscribe(response => {
  //       console.log(response);
  //       if (response.statusCode === 200) {
  //         // Reset the file input
  //         this.uploadFileInput.nativeElement.value = "";
  //         this.fileInputLabel = undefined;
  //       }
  //     }, er => {
  //       console.log(er);
  //       alert(er.error.error);
  //     });
  // }
  // getGalleryDetails(id: string): void {
  //   this.authService.getGalleryById(id)
  //     .subscribe((data: any) => {
  //       this.gallery = data;
  //       console.log(this.gallery);
  //       this.isLoadingResults = false;
  //     });
  // }
  // lostUser(user: any){
  //   this.isLoadingResults = true;
  //   this.authService.addGallery(this.lostForm.value, this.lostForm.get('itemimage').value._files[0])
  //     .subscribe((res: any) => {
  //       this.isLoadingResults = false;
  //       if (res.body) {
  //         this._router.navigate(['/home', res.body._id]);
  //       }
  //     }, (err: any) => {
  //       console.log(err);
  //       this.isLoadingResults = false;
  //     });


    // this.authService.lostUser(this.lostForm.value)
    //    .subscribe(res => {
    //     console.log('result is ', res);
    //     if((res as {[key: string]: any})['status']){
    //       alert('LOGIN SUCCESSFUL');
    //       localStorage.setItem('token', (res as {[key: string]: any})['token']);
    //       this.lostForm.reset();
    //       this._router.navigate(['/home']);
    //     }
    //     else{
    //       alert('Email of password is Incorrect!');
    //     }
    //    },error=>console.error(error));
    //this.authService.lostUser(user);
  //}
  // onFileSelect(event: Event){
  //     //console.log('File is Selected');
  //     const file = (event.target as HTMLInputElement).files[0];
  //     this.lostForm.patchValue({image : file });
  //     const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
  //     if(file && allowedMimeTypes.includes(file.type)) {
  //       const reader = new FileReader();
  //       reader.onload = () =>{
  //         this.imageData = reader.result as string ;
  //       }
  //       reader.readAsDataURL(file);
  //     }
  // }
  // closeAlert(){
  //   this.alert = false
  // }
}
