import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, AbstractControl, ValidatorFn, Validators, NG_VALIDATORS, Validator } from '@angular/forms';


@Directive({
    selector : '[sameValueAs]',
    providers: [{provide: NG_VALIDATORS, useExisting: SameValueValidatorDirective, multi:true}]
})

export class SameValueValidatorDirective implements Validator {
    @Input('sameValueAs') comparingControlName: string;

    validate(control:AbstractControl): {[key:string]: any}{

        let  compareControl:AbstractControl = control.root.get(this.comparingControlName);
        if (!compareControl)
            return {'sameValueAs': `${this.comparingControlName} is not a valid control to compare with`};
        let areEqual: boolean = control.value && compareControl.value &&  control.value === compareControl.value;
        return areEqual ? null : {'sameValueAs': true};
    }

}