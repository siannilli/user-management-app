import { OpaqueToken } from '@angular/core';
import { IUser } from '../shared/IUser';
import { IResultsetView } from '../shared/IResultsetView';
export let USER_SERVICE_TOKEN = new OpaqueToken('jwt.service.token');

export interface IUserService {

    getAllUsers (skip?: number, limit?: number): Promise<IResultsetView<IUser>>;
    getUser(id: string): Promise<IUser>;
    getAvailableRoles(): Promise<string[]>;
    getAvailableApplications(): Promise<string[]>;
    updateUser(id:string, user: IUser): Promise<IUser>;
    addUser(user: IUser): Promise<IUser>;
}

export abstract class UserServiceBase implements IUserService {    

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

    addUser(user: IUser): Promise<IUser> {
        return null;        
    }
}
