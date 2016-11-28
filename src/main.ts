import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AdminAppComponent, environment } from './app/';
import { UserService } from './app/user.service';
import { JwtService } from './app/jwt.service';

if (environment.production) {
  enableProdMode();
}

bootstrap(AdminAppComponent, [UserService, JwtService]);

