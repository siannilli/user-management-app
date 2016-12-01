import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OpaqueToken } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';

import { AdminAppComponent } from './admin.component';
import { UserComponent } from './+user/user.component';
import { UsersComponent } from './+users/users.component';
import { LoginComponent } from './+login/login.component';

import { JWT_SERVICE_TOKEN, JWT_SERVICE_URL_TOKEN, IJWTService } from './IServices/IJWTService';
import { USER_SERVICE_TOKEN, USER_SERVICE_URL_TOKEN, IUserService } from './IServices/IUserService';

import { environment } from '.';
import { UserService } from './Services/UserService';
import { JwtService } from './Services/JwtService';

import { InMemoryJwtService } from './Services/InMemoryJWTService';
import { InMemoryUserService } from './Services/InMemoryUserService';

@NgModule({
  declarations: [
    AdminAppComponent,
    UserComponent, UsersComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'users', component: UsersComponent},
      {path: 'user/:name', component: UserComponent},
      {path: '', component: UsersComponent}
    ])
  ],
  providers: [ 
      { provide: JWT_SERVICE_TOKEN , useClass : environment.production ? JwtService : InMemoryJwtService },
      { provide: USER_SERVICE_TOKEN , useClass : environment.production ? UserService : InMemoryUserService },
      { provide: JWT_SERVICE_URL_TOKEN, useValue: environment.authUrl || ''},
      { provide: USER_SERVICE_URL_TOKEN, useValue: environment.userServiceUrl || ''}
    ],
  bootstrap: [AdminAppComponent]
})

export class AppModule { }
