import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material/dialog';
import { ValidateEqualDirective } from '../../shared/validate-equal.directive';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {

  dialogForm: FormGroup;
  password_set: FormGroup;

  oldpassword: FormControl = new FormControl('', Validators.required);  
  password: FormControl = new FormControl('', Validators.required);
  password_confirm: FormControl = new FormControl('', Validators.required);
  
  self = this;
  
  constructor(private dialogRef: MdDialogRef<ChangePasswordDialogComponent>, private fb: FormBuilder) {

    this.password_set = this.fb.group({
          password: this.password,
          password_confirm: this.password_confirm
        }, { validator: ValidateEqualDirective.matchValuesInGroup });

    // build the forms
    this.dialogForm = this.fb.group(
      {
        oldpassword: this.oldpassword,
        password_set: this.password_set
      }
    )

  }

  onSubmit(){
    if (this.dialogForm.valid)
      this.dialogRef.close({oldpassword: this.oldpassword.value, password: this.password.value, password_confirm: this.password_confirm.value });      
  }

  ngOnInit() {
  }

}
