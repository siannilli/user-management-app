import { Injectable, ViewContainerRef } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Injectable()
export class NotificationsService {

  private toastConfig:MdSnackBarConfig;

  constructor(private toaster:MdSnackBar) { }

  set ViewContainerRef(value:ViewContainerRef){
      this.toastConfig = new MdSnackBarConfig(value);
      this.toastConfig.politeness = 'assertive';
  }

  showToastError(error:any){
      this.showToast(error.message || error._body || error, 'ERROR')
  }

  showToastInfo(message:string){
      this.showToast(message, "INFO");
  }
  
  private showToast(message:string, label:string, config:MdSnackBarConfig = undefined){
      let toastCfg: MdSnackBarConfig = config || this.toastConfig;        
      toastCfg.announcementMessage = label;

      this.toaster.open(message, 'CLOSE', toastCfg);
  }
}
