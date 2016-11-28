import { Component, OnInit } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar';
import { MdButton, MdAnchor } from '@angular2-material/button';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { LoginComponent } from './+login';
import { Router, Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { UsersComponent } from './+users';
import { UserComponent } from './+user';
import { JwtService } from './jwt.service';
import { UserService } from './user.service';

@Component({
  moduleId: module.id,
  selector: 'admin-app',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css'],
  directives: [ MdToolbar, ROUTER_DIRECTIVES, MdAnchor, MdButton, MdIcon ],
  providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, JwtService, UserService, MdIconRegistry]
})
@Routes([
  {path: '/login', component: LoginComponent},
  {path: '/users', component: UsersComponent},
  {path: '/user/:name', component: UserComponent},
  {path: '/', component: UsersComponent}
])
export class AdminAppComponent implements OnInit {
  title = 'Admin works!';
  
  constructor(private jwtService:JwtService, private router:Router){
      
  }
  
  logout(){
      this.jwtService.logout();
  }
  
  ngOnInit(){
      if (!this.jwtService.authentication_token) // jwt token not exists, navigate to login view 
        this.router.navigate(['/login']);
      
  }
}
