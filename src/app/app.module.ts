import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OpaqueToken, enableProdMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';

import { AdminAppComponent } from './admin.component';
import { UserComponent } from './+user/user.component';
import { UsersComponent } from './+users/users.component';
import { LoginComponent } from './+login/login.component';

import { NewUserComponent } from './dialogs/new-user/new-user.component';
import { ChangePasswordDialogComponent } from './dialogs/change-password-dialog/change-password-dialog.component';
import { ResetPasswordDialogComponent } from './dialogs/reset-password-dialog/reset-password-dialog.component';

import { SharedModule } from './shared/shared.module';

// configure service providers according current environment
let providers: any[] = []; // array of providers 

@NgModule({
  declarations: [    
    AdminAppComponent,
    UserComponent, UsersComponent, LoginComponent, NewUserComponent, ChangePasswordDialogComponent, ResetPasswordDialogComponent
  ],
  entryComponents: [NewUserComponent, ChangePasswordDialogComponent, ResetPasswordDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),    
    SharedModule,
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

export class AppModule { }
