import { Inject, Component, OnInit } from '@angular/core';

import { JWT_SERVICE_TOKEN, JWTServiceBase } from '../IServices/IJWTService';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({    
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    
    authentication_error: string = '';

    login(username: string, password: string) {

        let jwt = this.jwtService;
        let router = this.router;
        let self = this;
        jwt.login(username, password)        
            .then(() => { 
                console.debug('Login succeed');
                router.navigate(['/']);
            }).catch(error => self.authentication_error = error.message || error._body);

    }

    constructor(@Inject(JWT_SERVICE_TOKEN) private jwtService: JWTServiceBase, private router: Router) { }

    ngOnInit() {
    }

}
