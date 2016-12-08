import { Injectable, Component, ViewContainerRef } from '@angular/core';
import { ComponentType } from '@angular/material';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material/dialog';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DialogManagerService {

  ViewContainerRef:ViewContainerRef;

  constructor(private dialogService:MdDialog) { }

  show<C>( component:ComponentType<C> ): Promise<any> {
      let config:MdDialogConfig = new MdDialogConfig();
      config.role = 'dialog';
      config.viewContainerRef = this.ViewContainerRef;

      return this.dialogService.open( component, config ).afterClosed().toPromise();        
  }

}
