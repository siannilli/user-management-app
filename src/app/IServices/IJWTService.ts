import { OpaqueToken } from '@angular/core';

export let JWT_SERVICE_TOKEN = new OpaqueToken('jwt.service');
export let JWT_SERVICE_URL_TOKEN = new OpaqueToken('jwt.service.url');

export interface IJWTService {

    authentication_token: string;
    is_authenticated:boolean;
    login(username:string, password:string):Promise<void>; 
    logout():void;

}

export abstract class JWTServiceBase {
    authentication_token:string = null;
    get is_authenticated():boolean {
        return this.authentication_token !== null; 
    }
    logout():void {};

    login(username:string, password:string):Promise<void> {
        return null;
    }
}