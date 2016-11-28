import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Subscription,   } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class JwtService {
  
  AUTHENTICATE_URL = 'http://localhost:3000/users/authenticate';
  private TOKEN_NAME:string = 'authentication_token';

  constructor(private http:Http, private router:Router) {  
  
  }
       
  public get authentication_token() : string {
      return localStorage.getItem(this.TOKEN_NAME);
  }
   
  
  login(username:string, password:string) {     
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
      
    return this.http.post(this.AUTHENTICATE_URL, 
            JSON.stringify({ "username": username, "password": password}), 
            options)        
        .map((res:Response) => localStorage.setItem(this.TOKEN_NAME, res.json()));    
  }
  
  logout(){
      localStorage.removeItem(this.TOKEN_NAME);
      this.router.navigate(['/login']);
  }
  
  public get is_authenticated() : boolean {
      return (this.authentication_token !== undefined); // TODO: check decoded token for token expiration      
  }
  

  authenticate(){
      if (!this.is_authenticated)
        this.router.navigate(['/login']);  
  }

}
