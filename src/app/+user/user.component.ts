import { Component, OnInit, Input } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MdCheckbox } from '@angular2-material/checkbox';

import { Router, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';
import { IUser } from '../shared/IUser';
import { User } from '../shared/User';
import { UserService } from '../user.service';
import { JwtService } from '../jwt.service';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: 'app-user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.css'],
    directives: [
        ROUTER_DIRECTIVES, FORM_DIRECTIVES, MD_INPUT_DIRECTIVES, MD_CARD_DIRECTIVES,
        MD_LIST_DIRECTIVES, MdCheckbox
    ]
})
export class UserComponent implements OnInit {

    @Input()
    userId: string;

    user: IUser = new User(undefined, undefined);
    availableRoles: string[] = [];
    availableApps: string[] = [];

    apiErrorText: string;

    constructor(private routeSegment: RouteSegment,
        private userService: UserService,
        private jwtService: JwtService,
        private router: Router
    ) { }

    ngOnInit() {
        this.userId = this.routeSegment.getParam('name');
        this.apiErrorText = '';
        
        this.jwtService.authenticate();
        this.userService.getUser(this.userId)
            .subscribe(user => {
                this.user = user;
                console.log(`User ${this.userId} loaded`);
            }, error => this.apiErrorText = error._body);

        this.userService.getAvailableApplications()
            .subscribe( value => this.availableApps = value, 
            error => this.apiErrorText += `\n${error._body}`);
            
        this.userService.getAvailableRoles()
            .subscribe( value => this.availableRoles = value,             
             error => this.apiErrorText += `\n${error._body}`); 
    }
    
    enableAllApplications() {
        this.user.applications = [];        
        this.availableApps.forEach( app => this.user.applications.push(app));
    }
    
    enableAllRoles() {
        this.user.roles = [];
        this.availableRoles.forEach(role => this.user.roles.push(role));        
    }

    toggleApplication(app:string) {
        this.toggleArrayItem(this.user.applications, app);
    }
    
    toggleRole(role:string) {
        this.toggleArrayItem(this.user.roles, role);
    }
    
    private toggleArrayItem(arr:string[], item:string){
        if (arr.indexOf(item) > -1)
            arr.splice(arr.indexOf(item), 1);
        else
            arr.push(item);
        
    }

    update(){        
        this.userService.updateUser(this.userId, this.user)
            .subscribe((val: IUser) => this.router.navigate( ['/users']), 
                (err) => console.error(err));            
            
    }
}
