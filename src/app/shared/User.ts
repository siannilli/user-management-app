import { IUser } from './IUser';

export class User implements IUser{
    
    _id:string;
    email:string;
    applications:string[] = [] ;
    roles:string[] = [];
    
    constructor(public username:string, public password:string){
        
    }
}