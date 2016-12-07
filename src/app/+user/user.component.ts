import { Inject, Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material/dialog';
import { ResetPasswordDialogComponent } from '../dialogs/reset-password-dialog/reset-password-dialog.component';
import { Location } from '@angular/common';
import { IUser } from '../shared/IUser';
import { User } from '../shared/User';

import { UserServiceBase, USER_SERVICE_TOKEN } from '../IServices/IUserService';
import { JWTServiceBase, JWT_SERVICE_TOKEN } from '../IServices/IJWTService';
import { NotificationsService } from '../Services/notifications.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { environment } from '../';

@Component({
    selector: 'app-user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.css'],
})

export class UserComponent implements OnInit {

    @Input()
    userId: string;
    dialogConfig: MdDialogConfig = new MdDialogConfig();

    user: IUser = new User();
    availableRoles: string[] = [];
    availableApps: string[] = [];

    debugMode: boolean = environment.debugMode;

    constructor(
        private activeRoute: ActivatedRoute,
        private location: Location,
        @Inject(USER_SERVICE_TOKEN) private userService: UserServiceBase,
        @Inject(JWT_SERVICE_TOKEN) private jwtService: JWTServiceBase,
        private dialog: MdDialog,
        private toaster: NotificationsService,
        private router: Router,
        private vcr:ViewContainerRef
    ) {
        this.dialogConfig.role = 'dialog';
        this.dialogConfig.viewContainerRef = this.vcr;

    }

    ngOnInit() {
        this.toaster.ViewContainerRef = this.vcr;

        if (!this.jwtService.is_authenticated) // jwt token not exists, navigate to login view 
            this.router.navigate(['/login']);

        this.userId = this.activeRoute.snapshot.params['name'];

        let self = this;

        this.userService.getUser(this.userId)
            .then(user => {
                self.user = user;
                console.log(`User ${this.userId} loaded`);
            }, error => this.toaster.showToastError(error));

        this.userService.getAvailableApplications()
            .then(value => self.availableApps = value,
            error => this.toaster.showToastError(error));

        this.userService.getAvailableRoles()
            .then(value => self.availableRoles = value,
            error => this.toaster.showToastError(error));
    }

    enableAllApplications() {
        this.user.applications = [];
        this.availableApps.forEach(app => this.user.applications.push(app));
    }

    enableAllRoles() {
        this.user.roles = [];
        this.availableRoles.forEach(role => this.user.roles.push(role));
    }

    toggleApplication(app: string) {
        this.toggleArrayItem(this.user.applications, app);
    }

    toggleRole(role: string) {
        this.toggleArrayItem(this.user.roles, role);
    }

    isInRole(role: string): boolean {
        return this.user.roles.indexOf(role) > -1;
    }

    isInApplication(app: string): boolean {
        return this.user.applications.indexOf(app) > -1;
    }

    private toggleArrayItem(arr: string[], item: string) {
        console.debug(`Toggling value ${item} for array ${arr.toString()}`);

        if (arr.indexOf(item) > -1)
            arr.splice(arr.indexOf(item), 1);
        else
            arr.push(item);

    }

    delete() {
        if (window.confirm('Are you sure to delete current user?')){
            this.userService.delete(this.user._id)
                .then(() => this.router.navigate(['/users']))
                .catch(error => this.toaster.showToastError(error));
        }
    }

    update() {
        console.debug('Updating user...' + this.user);
        this.userService.updateUser(this.userId, this.user)
            .then((val: IUser) => {
                console.debug('user update succeed');
                this.router.navigate(['/']);
            })
            .catch(err => this.toaster.showToastError(err));

    }

    changePassword() {
        let resetPassword: MdDialogRef<ResetPasswordDialogComponent> = this.dialog.open(ResetPasswordDialogComponent, this.dialogConfig);
        resetPassword.afterClosed().subscribe((result) => {
            if (result != null) {
                this.userService.resetPassword(this.userId, result.password, result.password_confirm)
                    .then(() => this.toaster.showToastInfo('Password changed'))
                    .catch((error) => this.toaster.showToastError(error));
            }
            resetPassword = null;
        });
    }
}
