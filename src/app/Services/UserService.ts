import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { IUser } from '../shared/IUser';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { JWT_SERVICE_TOKEN, JWTServiceBase } from '../IServices/IJWTService';
import { IResultsetView } from '../shared/IResultsetView';
import { UserServiceBase, USER_SERVICE_URL_TOKEN } from '../IServices/IUserService';

class ResetPasswordCommand{
    password:string;
    password_confirm:string;
}

class ChangePasswordCommand extends ResetPasswordCommand{
    oldpassword:string;
}

@Injectable()
export class UserService implements UserServiceBase {



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

    addUser(username: string, password:string, password_confirm:string, email:string): Promise<string> {
        let user = {
            username:username,
            password:password,
            password_confirm: password_confirm,
            email:email
        };

        return this.http.post(this.USER_SERVICE_URL, JSON.stringify(user), this.HTTP_OPTIONS())                
            .map( resp => {
                console.debug(JSON.stringify(resp.headers));
                var location = resp.headers.get('Location');
                return location.substring(location.lastIndexOf('/')+1);                          
            }).toPromise();            
        
    }

    changePassword(oldpassword:string, password:string, password_confirm:string):Promise<void>{
        if (!(password === password_confirm))
            return Promise.reject({message: 'Password and password confirm do not match'});

        let body:ChangePasswordCommand = new ChangePasswordCommand();
        body.oldpassword = oldpassword;
        body.password = password;
        body.password_confirm = password_confirm;
        
        return this.http.patch(this.USER_SERVICE_URL + '/current/changepassword', body, this.HTTP_OPTIONS())            
            .toPromise();

    }

    resetPassword(id:string, password:string, password_confirm:string):Promise<void>{
        if (!(password === password_confirm))
            return Promise.reject({message: 'Password and password confirm do not match'});

        let body:ResetPasswordCommand = new ResetPasswordCommand();
        body.password = password;
        body.password_confirm = password_confirm;
        
        return this.http.patch(this.USER_SERVICE_URL + '/user/' + id + '/resetpassword', body, this.HTTP_OPTIONS())            
            .toPromise();
    }

    getCurrentUser():Promise<IUser>{
        return this.http.get(this.USER_SERVICE_URL + '/current', this.HTTP_OPTIONS())
            .map(res => res.json())
            .toPromise();
    }

    delete(id:string):Promise<IUser>{
        return this.http.delete(this.USER_SERVICE_URL + '/user/' + id, this.HTTP_OPTIONS())
            .toPromise();
    }
}
