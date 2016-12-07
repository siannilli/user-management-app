import { NgModule } from '@angular/core';

import { SameValueValidatorDirective }   from './SameValueAsValidator.directive';
import { ValidateEqualDirective } from './validate-equal.directive';

@NgModule({    
    exports: [SameValueValidatorDirective],
    declarations: [SameValueValidatorDirective, ValidateEqualDirective],    
})
export class SharedModule { }
