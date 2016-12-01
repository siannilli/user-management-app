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

import { JWT_SERVICE_TOKEN, IJWTService } from './IServices/IJWTService';
import { USER_SERVICE_TOKEN, IUserService } from './IServices/IUserService';

import { JwtServiceLocal } from './Services/InMemoryJWTService';
import { InMemoryUserService } from './Services/InMemoryUserService';

let userService:IUserService = new InMemoryUserService();
let jwtService:IJWTService = new JwtServiceLocal(userService);

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
      { provide: JWT_SERVICE_TOKEN , useValue : jwtService},
      { provide: USER_SERVICE_TOKEN , useValue : userService}
    ],
  bootstrap: [AdminAppComponent]
})

export class AppModule { }
