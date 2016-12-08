import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { DialogManagerService } from '../Services/dialog-manager.service';

import { environment } from '..';

import { JWT_SERVICE_TOKEN, JWT_SERVICE_URL_TOKEN } from '../IServices/IJWTService';
import { USER_SERVICE_TOKEN, USER_SERVICE_URL_TOKEN } from '../IServices/IUserService';

import { UserService } from '../Services/UserService';
import { JwtService } from '../Services/JwtService';

import { InMemoryJwtService } from '../Services/InMemoryJWTService';
import { InMemoryUserService } from '../Services/InMemoryUserService';

import { MenuService } from '../Services/MenuService';
import { NewUserComponent } from '../dialogs/new-user/new-user.component';
import { ChangePasswordDialogComponent } from '../dialogs/change-password-dialog/change-password-dialog.component';
import { ResetPasswordDialogComponent } from '../dialogs/reset-password-dialog/reset-password-dialog.component';
import { NotificationsService } from '../Services/notifications.service';

import { SameValueValidatorDirective }   from './SameValueAsValidator.directive';
import { ValidateEqualDirective } from './validate-equal.directive';
// configure service providers according current environment
let providers: any[] = []; // array of providers 

providers.push(MenuService);
providers.push(NotificationsService);
providers.push(DialogManagerService);

if (!environment.offline){
      providers.push({ provide: JWT_SERVICE_TOKEN , useClass : JwtService });
      providers.push({ provide: USER_SERVICE_TOKEN , useClass : UserService });
      
      // inject service configuration values as providers  
      providers.push({ provide: JWT_SERVICE_URL_TOKEN, useValue: environment.authServiceUrl });
      providers.push({ provide: USER_SERVICE_URL_TOKEN, useValue: environment.userServiceUrl });
}
else{
      // dev mode
      providers.push({ provide: JWT_SERVICE_TOKEN , useClass : InMemoryJwtService });
      providers.push({ provide: USER_SERVICE_TOKEN , useClass : InMemoryUserService });
}


@NgModule({    
    imports: [MaterialModule.forRoot()],
    exports: [SameValueValidatorDirective],
    declarations: [SameValueValidatorDirective, ValidateEqualDirective],
    providers: providers
})
export class SharedModule { }
