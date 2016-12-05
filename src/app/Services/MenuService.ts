import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { IMenuItem } from './MenuItem';

@Injectable()
export class MenuService {

    private menuActionSource = new Subject<string>();

    menuActions$ = this.menuActionSource.asObservable();

    constructor() { }

    logout():void{
        this.triggerAction('logout');
    }

    private triggerAction(action: string){
        this.menuActionSource.next(action);
    }

}