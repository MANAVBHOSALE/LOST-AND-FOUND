import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LostItemComponent } from './lost-item/lost-item.component';
import { FoundItemComponent } from './found-item/found-item.component';
import { ResponsesComponent } from './responses/responses.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LostItemComponent,
    LoginComponent,
    FoundItemComponent,
    ResponsesComponent,
    PageNotFoundComponent,
    LoginComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    RegisterComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
      RouterModule.forRoot([
        {path: ' ',  redirectTo: '/LoginComponent', pathMatch: 'full'}
      ])
    ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
