import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OpaqueToken, enableProdMode } from '@angular/core';
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

// configure service providers according current environment
let providers: any[] = []; // array of providers 

if (!environment.offline){
      providers.push({ provide: JWT_SERVICE_TOKEN , useClass : JwtService });
      providers.push({ provide: USER_SERVICE_TOKEN , useClass : UserService });
      
      // inject service configuration values as providers  
      providers.push({ provide: JWT_SERVICE_URL_TOKEN, useValue: environment.authServiceUrl });
      providers.push({ provide: USER_SERVICE_URL_TOKEN, useValue: environment.userServiceUrl });
}
else{
      // dev mode
      providers.push({ provide: JWT_SERVICE_TOKEN , useClass : InMemoryJwtService });
      providers.push({ provide: USER_SERVICE_TOKEN , useClass : InMemoryUserService });
}


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
  providers: providers,
  bootstrap: [AdminAppComponent]
})

export class AppModule { 
  /**
   *
   */
  constructor() {
    if (environment.debugMode)
      console.warn(environment);
  }

}
