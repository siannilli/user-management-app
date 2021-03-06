import { Component, OnInit, Inject, Output, OnDestroy, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../shared/IUser';
import { UserServiceBase, USER_SERVICE_TOKEN } from '../IServices/IUserService';
import { JWTServiceBase, JWT_SERVICE_TOKEN } from '../IServices/IJWTService';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { MenuService } from '../Services/MenuService';
import { NewUserComponent } from '../dialogs/new-user/new-user.component';
import { ChangePasswordDialogComponent } from '../dialogs/change-password-dialog/change-password-dialog.component';
import { NotificationsService } from '../Services/notifications.service';
import { DialogManagerService } from '../Services/dialog-manager.service';

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
    self = this;

    constructor(
        @Inject(USER_SERVICE_TOKEN) private userService: UserServiceBase, 
        @Inject(JWT_SERVICE_TOKEN) private jwtService: JWTServiceBase,
        private menu:MenuService, 
        private dialog:DialogManagerService,
        private toaster:NotificationsService,
        private vcr:ViewContainerRef,
        private router: Router) {
            

        }


    addUser(){        
        let newUserDialog:Promise<any>
             = this.dialog.show(NewUserComponent);

        newUserDialog.then((result) =>{
            if (result != null){
                this.userService.addUser(result.username, result.password, result.password_confirm, result.email)
                    .then(user => {
                        console.debug(user);
                        this.router.navigate(['/user', user]); 
                    })
                    .catch(err => this.toaster.showToastError(err));
            }                
        } );
    }

    changePassword(){
        this.menuOpen = false; // close the menu

        let changePasswordDialog:Promise<any> = 
            this.dialog.show(ChangePasswordDialogComponent);

        changePasswordDialog
            .then((result) => 
                {
                    if (result != null){
                        this.userService.changePassword(result.oldpassword, result.password, result.password_confirm)
                            .then(() => this.toaster.showToastInfo('Password has been changed'))
                            .catch((err)=>  this.toaster.showToastError(err));                            
                    }                    
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

        // Set view container reference for services that need to create child dom elements
        this.dialog.ViewContainerRef = this.vcr;
        this.toaster.ViewContainerRef = this.vcr;

        if (!this.jwtService.is_authenticated) // jwt token not exists, navigate to login view 
        {
            console.log('Not authenticated. Redirecting to login.');
            this.router.navigate(['/login']);
        }

        this.userService.getCurrentUser()
            .then(user => this.currentUser = user)
            .catch(() => this.currentUser = undefined);

        console.debug('Loading list of users');
        this.userService.getAllUsers()
            .then(users => {
                console.debug(`Found ${users.found} users`);
                this.users = users.view;
            })
            .catch(error => this.toaster.showToastError(error));
            
    }

}
