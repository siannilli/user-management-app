import { Inject, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Subscription,   } from 'rxjs';
import { IUser } from '../shared/IUser';
import { JWTServiceBase } from '../IServices/IJWTService';
import { UserServiceBase, USER_SERVICE_TOKEN } from '../IServices/IUserService';

@Injectable()
export class InMemoryJwtService implements JWTServiceBase {

  private TOKEN_NAME:string = 'authentication_token';

  constructor(
       @Inject(USER_SERVICE_TOKEN) private userService:UserServiceBase) {  
  
  }
       
  public get authentication_token() : string {
      return localStorage.getItem(this.TOKEN_NAME);
  }
   
  
  login(username:string, password:string): Promise<void> {     

    return this.userService.getAllUsers()
        .then(results => {
            let user = results.view.find(user => user.username === username && user.password === password);
            if (user === undefined)
                return Promise.reject({ message: "Either username or password are not valid"});

            return Promise.resolve();
        });
  }
  
  logout(): void{
      localStorage.removeItem(this.TOKEN_NAME);
  }
  
  public get is_authenticated() : boolean {
      return (this.authentication_token !== undefined); // TODO: check decoded token for token expiration      
  }

}
