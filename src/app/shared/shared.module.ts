import { NgModule } from '@angular/core';

import { SameValueValidatorDirective }   from './SameValueAsValidator.directive';

@NgModule({    
    exports: [SameValueValidatorDirective],
    declarations: [SameValueValidatorDirective],    
})
export class SharedModule { }
