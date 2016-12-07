import { Attribute, Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, AbstractControl, ValidatorFn, Validators, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appValidateEqual]',
    providers: [{provide: NG_VALIDATORS, useExisting: ValidateEqualDirective, multi:true}]
})



export class ValidateEqualDirective implements Validator {  
  constructor() { }

  validate(control:AbstractControl): {[key:string]: any}{        
    return ValidateEqualDirective.matchValuesInGroup(control);

  }

  static matchValuesInGroup(password_set: AbstractControl): { [key: string]: any } {

    let groupOfControls:FormGroup = <FormGroup>password_set;  
    let areEqual:boolean = true;
    let value:string = undefined;

    if (groupOfControls.controls){
      for (let name in groupOfControls.controls){
        if (!value)
          value = groupOfControls.controls[name].value;
        else{
          if (value !== groupOfControls.controls[name].value){
            areEqual = false;
            break;
          }        
        }
      }
    } 
    else
      areEqual = false;    

    return areEqual ? null : {'validateEqual': true};
  
  }

}
