import { Component, OnInit, Inject } from '@angular/core';
import { Router, ROUTER_PROVIDERS } from '@angular/router';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { IUser } from '../shared/IUser';
import { UserService } from '../user.service';
import { JwtService } from '../jwt.service';
import { Observable } from 'rxjs';


@Component({
  moduleId: module.id,
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.css'],
  directives: [MD_LIST_DIRECTIVES, MdIcon]
  
})

export class UsersComponent implements OnInit {

  users:IUser[];
  apiErrorText:string;
  
  constructor(private userService:UserService, private jwtService:JwtService, private router:Router) {}

  onSelect(user:IUser){      
      console.log(user.username);
      this.router.navigate(['/user', user._id]);
  }

  ngOnInit() {
      
      this.jwtService.authenticate();
      
      this.apiErrorText = undefined;
      this.userService.getAllUsers()
          .subscribe(
              users => this.users = users.view,
              error => this.apiErrorText = error._body
          );
      
  }

}
