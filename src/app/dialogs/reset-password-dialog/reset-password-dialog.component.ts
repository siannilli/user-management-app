import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material/dialog';
import { ValidateEqualDirective } from '../../shared/validate-equal.directive';


@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.css']
})
export class ResetPasswordDialogComponent implements OnInit {
  dialogForm: FormGroup;      
  password: FormControl = new FormControl('', Validators.required);
  password_confirm: FormControl = new FormControl('', Validators.required);

  constructor(private dialogRef:MdDialogRef<ResetPasswordDialogComponent>, private fb: FormBuilder) {
    this.dialogForm = this.fb.group({
          password: this.password,
          password_confirm: this.password_confirm
        }, { validator: ValidateEqualDirective.matchValuesInGroup });


   }

  ngOnInit() {
  }

}
