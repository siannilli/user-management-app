import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Subscription,   } from 'rxjs';
import { IUser } from '../shared/IUser';
import { IJWTService, JWTServiceBase, JWT_SERVICE_URL_TOKEN } from '../IServices/IJWTService';
import { environment } from '..';

@Injectable()
export class JwtService implements IJWTService {
  
  private TOKEN_NAME:string = 'authentication_token';

  constructor(
      private http:Http, 
      @Inject(JWT_SERVICE_URL_TOKEN) private AUTHENTICATE_URL: string = 'http://localhost:3000/users/authenticate' ) {  
  
  }
       
  public get authentication_token() : string {
      return localStorage.getItem(this.TOKEN_NAME);
  }
   
  
  login(username:string, password:string): Promise<void> {     
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
      
    return this.http.post(this.AUTHENTICATE_URL, 
            JSON.stringify({ "username": username, "password": password}), 
            options)
            .map(res => localStorage.setItem(this.TOKEN_NAME, res.text()))                
            .toPromise();
  }
  
  logout(): void{
      localStorage.removeItem(this.TOKEN_NAME);
  }
  
  public get is_authenticated() : boolean {
      return (this.authentication_token !== undefined); // TODO: check decoded token for token expiration      
  }

}
