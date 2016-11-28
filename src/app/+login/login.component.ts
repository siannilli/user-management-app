import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/common';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { FORM_DIRECTIVES } from '@angular/common/index';
import { MdButton } from '@angular2-material/button';

import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    directives: [MD_INPUT_DIRECTIVES, MD_CARD_DIRECTIVES, FORM_DIRECTIVES, MdButton, NgForm]
})
export class LoginComponent implements OnInit {
    
    authentication_error: string = '';

    login(username: string, password: string) {
        let jwt = this.jwtService;
        let router = this.router;
        let self = this;
        jwt.login(username, password)
            .subscribe(value =>{ router.navigate(['/']);} 
            , error => self.authentication_error = error._body);

    }

    constructor(private jwtService: JwtService, private router: Router) { }

    ngOnInit() {
    }

}
