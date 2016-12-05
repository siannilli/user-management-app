import { Component, OnInit, Inject, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../shared/IUser';
import { UserServiceBase, USER_SERVICE_TOKEN } from '../IServices/IUserService';
import { JWTServiceBase, JWT_SERVICE_TOKEN } from '../IServices/IJWTService';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { MenuService } from '../Services/MenuService';


@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.css'],

})

export class UsersComponent implements OnInit {
    
    title:string = "List of users"
    users: IUser[];
    apiErrorText: string;
    self = this;

    constructor(
        @Inject(USER_SERVICE_TOKEN) private userService: UserServiceBase, 
        @Inject(JWT_SERVICE_TOKEN) private jwtService: JWTServiceBase,
        private menu:MenuService, 
        private router: Router) {
            

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
