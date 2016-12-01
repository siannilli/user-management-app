import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../shared/IUser';
import { UserServiceBase, USER_SERVICE_TOKEN } from '../IServices/IUserService';
import { JWTServiceBase, JWT_SERVICE_TOKEN } from '../IServices/IJWTService';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.css'],

})

export class UsersComponent implements OnInit {

    users: IUser[];
    apiErrorText: string;

    constructor(@Inject(USER_SERVICE_TOKEN) private userService: UserServiceBase, @Inject(JWT_SERVICE_TOKEN) private jwtService: JWTServiceBase, private router: Router) { }

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
        this.userService.getAllUsers()
            .then(
            users => this.users = users.view,
            error => this.apiErrorText = error._body
            );
    }

}
