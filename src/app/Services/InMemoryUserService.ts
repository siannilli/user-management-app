import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { IUser } from '../shared/IUser';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { UserServiceBase } from '../IServices/IUserService';
import { IResultsetView } from '../shared/IResultsetView';

@Injectable()
export class InMemoryUserService implements UserServiceBase {

    USER_LIST:IUser[] = require('./userDatabase.json');
    DEV_APPLICATIONS:string[] = ["User admin", "Spot"];
    DEV_ROLES: string[] = ["admin", "chartering"];    

    constructor() {                

    }

    getAllUsers (skip?: number, limit: number = 10): Promise<IResultsetView<IUser>> {

        var resultView:IResultsetView<IUser> = 
        { 
            found : this.USER_LIST.length,
            page: 1, 
            sortfield: null, 
            view: this.USER_LIST, 
            viewcount: this.USER_LIST.length 
        };

        return Promise.resolve(resultView);
    }

    getUser(id: string): Promise<IUser> {
        
        // development
        return Promise.resolve(this.USER_LIST.find( user => user._id === id));            
    }
    
    getAvailableRoles() : Promise<string[]> {
        
        return Promise.resolve(this.DEV_ROLES);             
    }
    
    getAvailableApplications(): Promise<string[]> {
        
        return Promise.resolve(this.DEV_APPLICATIONS);        
    }

    updateUser(id :string, user: IUser) : Promise<IUser>{
        

        let idx:number = this.USER_LIST.findIndex(search => search._id === id);

        if (idx === -1)
            return Promise.reject({message: 'User does not exist'});                     
        
        this.USER_LIST[idx] = user;
        return Promise.resolve(user); 
    }

    addUser(username: string, password:string, password_confirm:string, email:string): Promise<string> {

        if (!(password === password_confirm))
            return Promise.reject({ message: 'Password and password confirm do not match'});

        let user:IUser = {
            _id: undefined,
            username: username,
            password: password,
            email: email,
            roles:[],
            applications: []
        };
        
        // dev mode
        let idx:number = this.USER_LIST.findIndex(search => search.username === user.username);

        if (idx >= 0)
            return Promise.reject({message: `Primary key violation for username ${user.username}`});                     
        
        user._id = user.username;

        this.USER_LIST.push(user);
        return Promise.resolve(user._id);
        
    }

    getCurrentUser(): Promise<IUser>{
        return Promise.resolve(this.currentUser()); // return first item on list, should lookup according jwt service token
    }

    resetPassword(id:string, password:string, password_confirm:string): Promise<void>{
        
        if (!(password === password_confirm))
            return Promise.reject({ message: 'Password and password confirm do not match'});

        let userIdx = this.USER_LIST.findIndex(user => user._id === id);
        if (userIdx <0 )
            return Promise.reject({message: 'User not found'}); 
        
        this.USER_LIST[userIdx].password = password;
        return Promise.resolve();
    }

    changePassword(oldpassword:string, password:string, password_confirm:string):Promise<void>
    {
        
        if (!(password === password_confirm))
            return Promise.reject({ message: 'Password and password confirm do not match'});

        let user = this.currentUser();

        if (!(user.password === oldpassword))
            return Promise.reject({message: 'Old password does not match'});

        user.password = password;        
        return Promise.resolve();
    }

    delete(id:string):Promise<void>{

        let idx:number = this.USER_LIST.findIndex(user => user._id === id);
        if (idx < 0)
            return Promise.reject({message: 'User not found'});
        
        this.USER_LIST.splice(idx, 1);
        return Promise.resolve();
    }

    private currentUser():IUser{
        return this.USER_LIST[0];
    }

}
