import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { IUser } from '../shared/IUser';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { JWT_SERVICE_TOKEN, JWTServiceBase } from '../IServices/IJWTService';
import { IResultsetView } from '../shared/IResultsetView';
import { IUserService, USER_SERVICE_URL_TOKEN } from '../IServices/IUserService';

@Injectable()
export class UserService implements IUserService {

    constructor(
        private http: Http, 
        @Inject(USER_SERVICE_URL_TOKEN) private USER_SERVICE_URL:string = 'http://localhost:3000/users',
        @Inject(JWT_SERVICE_TOKEN) private jwtService: JWTServiceBase) {                

    }

    private HTTP_OPTIONS():RequestOptions{
        let headers = new Headers({ 'Content-type': 'application/json'});

        if (this.jwtService.is_authenticated && this.jwtService.authentication_token)
            headers.set('Authorization', `${this.jwtService.authentication_token}`)        
        
        return new RequestOptions({ headers: headers });
    }

    getAllUsers (skip?: number, limit: number = 10): Promise<IResultsetView<IUser>> {
        return this.http.get(this.USER_SERVICE_URL, this.HTTP_OPTIONS())
            .map( resp => resp.json() )
            .toPromise();        
    }

    getUser(id: string): Promise<IUser> {        
        return this.http.get(this.USER_SERVICE_URL + '/user/' + id, this.HTTP_OPTIONS())
            .map( resp => resp.json() )
            .toPromise();
    }
    
    getAvailableRoles() : Promise<string[]> {
        return this.http.get(this.USER_SERVICE_URL + '/getroles', this.HTTP_OPTIONS())
            .map( resp => resp.json() )
            .toPromise();
    }
    
    getAvailableApplications(): Promise<string[]> {
        return this.http.get(this.USER_SERVICE_URL + '/getapplications', this.HTTP_OPTIONS())
            .map( resp => resp.json() )
            .toPromise();                
    }

    updateUser(id :string, user: IUser) : Promise<IUser>{        
        delete user.password;        
        delete user._id;
        
        let body:string = JSON.stringify(user);
        let options:RequestOptions = this.HTTP_OPTIONS();
        options.body = body;

        return this.http.patch(this.USER_SERVICE_URL + '/user/' + id, body, options )
            .map( resp => resp.json() )
            .toPromise();            
    }

    addUser(user: IUser): Promise<IUser> {
        delete user._id; // remove eventual _id            
        return this.http.post(this.USER_SERVICE_URL, JSON.stringify(user), this.HTTP_OPTIONS())
            .map( resp => resp.json() )
            .toPromise();
        
    }
}
