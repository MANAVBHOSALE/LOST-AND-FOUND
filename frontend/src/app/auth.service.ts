import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";
import { image } from './user/image';

//let headers = new HttpHeaders({
//  "Content-Type": "application/json",
 // "Accept": "application/json"
//});
// let options = {
//   headers: headers
// }
//const options = {headers: {'Content-Type': 'application/json'}};
// const options = {
//   method: 'POST',
//   headers: {
//       'Content-type': 'application/json', // or remove this headers section
//   },
//   bodydata: Userinfo
// }
//const apiUrl = 'http://localhost:4001/lost';


@Injectable({
  providedIn: 'root',
  
})

export class AuthService { 
  private image: image[] = [];
  private image$ = new Subject<image[]>();
  alert : boolean = false
  baseURL = 'http://localhost:4001/lost';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  
  currentUser = {};

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  constructor(private http : HttpClient, public router: Router){ }

  registerUser(user: any){

    this.http.post("http://localhost:4001/user/register", user).subscribe(res =>{
      console.log(res);
    });
    this.alert = true;
  }

  // Create lost data
  addlost(email: string, mobile_no: number, itemname:string, description:string, 
    question:string, type:string, url:File): Observable<any> {
      var formData: any = new FormData();
      formData.append('email', email);
      formData.append('mobile_no', mobile_no);
      formData.append('itemname', itemname);
      formData.append('description', description);
      formData.append('question', question);
      formData.append('type', type);
      formData.append('url', url);
    return this.http.post<image>(`${this.baseURL}`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  loginUser(user:any) { 
    // this.http.post<any>("http://localhost:4001/user/login", options, user).subscribe(res =>{
    //   console.log(res);
    //   headers:new HttpHeaders().append('Content-Type','application/json');
    // });
    return this.http.post(
      'http://localhost:4001/user/login',
      user,
      )
    //return this.http.post<Userinfo>("http://localhost:4001/user/login", user)
  }

  getLostData(){
    return this.http.get(`http://localhost:4001/lost`);
  }
  // getProfiles() {
  //   this.http
  //     .get<{ profiles: image[] }>(this.baseURL)
  //     .pipe(
  //       map((profileData) => {
  //         return profileData.profiles;
  //       })
  //     )
  //     .subscribe((image) => {
  //       this.image = image;
  //       this.image$.next(this.image);
  //     });
  // }

  // getProfilesStream() {
  //   return this.image$.asObservable();
  // }

  // getGalleryById(id: string): Observable<any> {
  //   const url = `${apiUrl}/${id}`;
  //   return this.http.get<image>(url).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  
  // addGallery(image: image, file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('imageTitle', image.itemname);
  //   //formData.append('imageDesc', image.imageDesc);
  //   const header = new HttpHeaders();
  //   const params = new HttpParams();

}

