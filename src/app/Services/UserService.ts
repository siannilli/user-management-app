import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { IUser } from '../shared/IUser';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { JWT_SERVICE_TOKEN, JWTServiceBase } from '../IServices/IJWTService';
import { IResultsetView } from '../shared/IResultsetView';

@Injectable()
export class UserService {

    constructor(
        private http: Http, 
        private USER_SERVICE_URL: string = 'http://localhost:3000/users',
        @Inject(JWT_SERVICE_TOKEN) private jwtService: JWTServiceBase) {                

    }

    private HTTP_OPTIONS():RequestOptions{
        let headers = new Headers({ 'Authorization': `Bearer ${this.jwtService.authentication_token}`  });
        return new RequestOptions({ headers: headers });
    }

    getAllUsers (skip?: number, limit: number = 10): Promise<IResultsetView<IUser>> {
        return this.http.get(this.USER_SERVICE_URL, this.HTTP_OPTIONS).toPromise();        
    }

    getUser(id: string): Promise<IUser> {        
        return this.http.get(this.USER_SERVICE_URL + '/user/' + id, this.HTTP_OPTIONS()).toPromise();
    }
    
    getAvailableRoles() : Promise<string[]> {
        return this.http.get(this.USER_SERVICE_URL + '/getroles', this.HTTP_OPTIONS()).toPromise();
    }
    
    getAvailableApplications(): Promise<string[]> {
        return this.http.get(this.USER_SERVICE_URL + '/getapplications', this.HTTP_OPTIONS()).toPromise();                
    }

    updateUser(id :string, user: IUser) : Promise<IUser>{        
        delete user.password;        
        delete user._id;
        
        let body:string = JSON.stringify(user);

        return this.http.patch(this.USER_SERVICE_URL + '/user/' + id, body, this.HTTP_OPTIONS()).toPromise();            
    }

    addUser(user: IUser): Promise<IUser> {
        delete user._id; // remove eventual _id            
        return this.http.post(this.USER_SERVICE_URL, JSON.stringify(user), this.HTTP_OPTIONS()).toPromise();
        
    }
}
