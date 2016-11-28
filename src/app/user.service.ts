import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { IUser } from './shared/IUser';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { JwtService } from './jwt.service';
import { IResultsetView } from './shared/IResultsetView';

@Injectable()
export class UserService {

    USER_SERVICE_URL: string = 'http://localhost:3000/users';

    constructor(private http: Http, private jwtService: JwtService) {

    }

    getAllUsers(skip?: number, limit: number = 10) {

        let headers = new Headers({ 'Authorization': this.jwtService.authentication_token });
        let options = new RequestOptions({ headers: headers });

        return <Observable<IResultsetView<IUser>>>this.http.get(this.USER_SERVICE_URL, options)
            .map((res: Response) => res.json());
    }

    getUser(id: string) {
        let headers = new Headers({ 'Authorization': this.jwtService.authentication_token });
        let options = new RequestOptions({ headers: headers });
        
        return <Observable<IUser>>this.http.get(this.USER_SERVICE_URL + '/user/' + id, options)
            .map((res:Response) => res.json());
    }
    
    getAvailableRoles() {
        let headers = new Headers({ 'Authorization': this.jwtService.authentication_token });
        let options = new RequestOptions({ headers: headers });
        
        return <Observable<string[]>>this.http.get(this.USER_SERVICE_URL + '/getroles', options)
            .map( (response: Response) => response.json());
        
    }
    
    getAvailableApplications() {
        let headers = new Headers({ 'Authorization': this.jwtService.authentication_token });
        let options = new RequestOptions({ headers: headers });
        
        return <Observable<string[]>>this.http.get(this.USER_SERVICE_URL + '/getapplications', options)
            .map( (response: Response) => response.json());
        
    }

    updateUser(id :string, user: IUser){
        let headers :Headers = new Headers({ 'Authorization' : this.jwtService.authentication_token});        
        headers.append('Content-Type', 'application/json');
        
        delete user.password;        
        delete user._id;

        let options = new RequestOptions({ body: JSON.stringify(user), headers: headers});
        let body = JSON.stringify(user);

        console.log('posting data to user service')
        
        return <Observable<IUser>>this.http.patch(this.USER_SERVICE_URL + '/user/' + id, body, options)
            .map((response: Response) => response.json());
    }

}
