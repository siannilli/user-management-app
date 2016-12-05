import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {
  result = {
    oldpassword: undefined,
    password: undefined,
    password_confirm:undefined
  }
  constructor(private dialogRef:MdDialogRef<ChangePasswordDialogComponent>) { }

  ngOnInit() {
  }

}
