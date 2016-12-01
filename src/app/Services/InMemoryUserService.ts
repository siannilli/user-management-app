import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { IUser } from '../shared/IUser';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { IUserService } from '../IServices/IUserService';
import { IResultsetView } from '../shared/IResultsetView';

@Injectable()
export class InMemoryUserService implements IUserService {

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

    addUser(user: IUser): Promise<IUser> {

        // dev mode
        let idx:number = this.USER_LIST.findIndex(search => search.username === user.username);

        if (idx >= 0)
            return Promise.reject({message: `Primary key violation for username ${user.username}`});                     
        
        user._id = user.username;

        this.USER_LIST.push(user);
        return Promise.resolve(user);
        
    }

}
