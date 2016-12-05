import { Component, OnInit, Inject, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../shared/IUser';
import { UserServiceBase, USER_SERVICE_TOKEN } from '../IServices/IUserService';
import { JWTServiceBase, JWT_SERVICE_TOKEN } from '../IServices/IJWTService';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { MenuService } from '../Services/MenuService';
import { NewUserComponent } from '../dialogs/new-user/new-user.component';
import { ChangePasswordDialogComponent } from '../dialogs/change-password-dialog/change-password-dialog.component';
import { MdDialog, MdDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.css'],

})

export class UsersComponent implements OnInit {
    menuOpen = false;
    currentUser :IUser = undefined;
    title:string = "List of users"
    users: IUser[];
    apiErrorText: string;
    self = this;

    constructor(
        @Inject(USER_SERVICE_TOKEN) private userService: UserServiceBase, 
        @Inject(JWT_SERVICE_TOKEN) private jwtService: JWTServiceBase,
        private menu:MenuService, 
        private dialog:MdDialog,
        private router: Router) {
            

        }

    addUser(){        
        
        let newUserDialog:MdDialogRef<NewUserComponent>
             = this.dialog.open(NewUserComponent);

        newUserDialog.afterClosed()
            .subscribe((result) =>{
                if (result != null){
                    this.userService.addUser(result.username, result.password, result.password_confirm, result.email)
                        .then(user => {
                            console.debug(user);
                            this.router.navigate(['/user', user]); 
                        })
                        .catch(err => this.apiErrorText = err._body || err);
                }
                newUserDialog = null;
        } );
    }

    changePassword(){
        this.menuOpen = false; // close the menu
        this.apiErrorText = undefined;

        let changePasswordDialog:MdDialogRef<ChangePasswordDialogComponent> = 
            this.dialog.open(ChangePasswordDialogComponent);

        changePasswordDialog.afterClosed()
                .subscribe((result) => 
                {
                    if (result != null){
                        this.userService.changePassword(result.oldpassword, result.password, result.password_confirm)
                            .then(() => this.apiErrorText = 'Password has been changed')
                            .catch((err)=> this.apiErrorText = err._body || err);                            
                    }
                    changePasswordDialog = null;
                });
    }

    logout(){
        this.menu.logout();
    }

    onSelect(user: IUser) {
        console.log(user.username);
        this.router.navigate(['/user', user._id]);
    }

    ngOnInit() {
        if (!this.jwtService.is_authenticated) // jwt token not exists, navigate to login view 
        {
            console.log('Not authenticated. Redirecting to login.');
            this.router.navigate(['/login']);
        }

        this.userService.getCurrentUser()
            .then(user => this.currentUser = user)
            .catch(() => this.currentUser = undefined);

        this.apiErrorText = undefined;

        console.debug('Loading list of users');
        this.userService.getAllUsers()
            .then(users => {
                console.debug(`Found ${users.found} users`);
                this.users = users.view;
            })
            .catch(error => this.apiErrorText = error._body || error);
            
    }

}
