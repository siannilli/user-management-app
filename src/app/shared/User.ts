import { IUser } from './IUser';

export class User implements IUser{
    
    _id:string;
    username:string;
    password:string;
    email:string;
    applications:string[] = [] ;
    roles:string[] = [];
    
    constructor(){
        
    }
}