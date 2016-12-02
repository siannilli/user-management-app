import { Component, OnInit, Inject, enableProdMode } from '@angular/core';

import { LoginComponent } from './+login';
import { Router, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { UsersComponent } from './+users';
import { UserComponent } from './+user';
import { JWTServiceBase, JWT_SERVICE_TOKEN } from './IServices/IJWTService';
import { environment } from '.';

@Component({
  selector: 'admin-app',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css'],
})

export class AdminAppComponent implements OnInit {
  title = 'User management application';

  constructor( @Inject(JWT_SERVICE_TOKEN) private jwtService: JWTServiceBase, private router: Router) {

    if (!environment.production)
      this.title = this.title.concat(' (development mode)');
  }

  logout() {
    this.jwtService.logout();
    this.router.navigate(['/login']);

  }

  ngOnInit() {
    if (!this.jwtService.is_authenticated) // jwt token not exists, navigate to login view 
    {
      console.warn('Not authetnicated. Redirecting to login');
      this.router.navigate(['/login']);
    }

  }
}
