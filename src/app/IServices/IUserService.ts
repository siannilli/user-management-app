import { OpaqueToken } from '@angular/core';
import { IUser } from '../shared/IUser';
import { IResultsetView } from '../shared/IResultsetView';

export let USER_SERVICE_TOKEN = new OpaqueToken('user.service');
export let USER_SERVICE_URL_TOKEN = new OpaqueToken('user.service.url');

interface IUserService {

    getAllUsers (skip?: number, limit?: number): Promise<IResultsetView<IUser>>;
    getUser(id: string): Promise<IUser>;
    getAvailableRoles(): Promise<string[]>;
    getAvailableApplications(): Promise<string[]>;
    getCurrentUser():Promise<IUser>;
    changePassword(oldpassword:string, password:string, confirm_password:string):Promise<void>;
    resetPassword(id:string, password:string, confirm_password:string):Promise<void>;
    updateUser(id:string, user: IUser): Promise<IUser>;
    addUser(username: string, password:string, password_confirm:string, email:string): Promise<string>;
    delete(id:string):Promise<void>;
}

// Abstract class required to accept injected service by Angular injection 
export abstract class UserServiceBase implements IUserService {    

    resetPassword(id:string, password:string, confirm_password:string):Promise<void> {
        return null;
    }

    changePassword(oldpassword:string, password:string, confirm_password:string): Promise<void>{
        return null;
    }

    getCurrentUser():Promise<IUser>{
        return null;
    }
    getAllUsers (skip?: number, limit: number = 10): Promise<IResultsetView<IUser>> {
        return null
    }

    getUser(id: string): Promise<IUser> {
        return null;        
    }
    
    getAvailableRoles() : Promise<string[]> {
        return null;             
    }
    
    getAvailableApplications(): Promise<string[]> {
        return null;
    }

    updateUser(id :string, user: IUser) : Promise<IUser>{
        return null; 
    }

    addUser(username:string, password:string, password_confirm:string, email:string): Promise<string> {
        return null;        
    }
    delete(id:string):Promise<string>{
        return null;
    }
}
