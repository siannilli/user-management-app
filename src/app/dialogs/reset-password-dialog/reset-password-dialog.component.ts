import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.css']
})
export class ResetPasswordDialogComponent implements OnInit {

  constructor(private dialogRef:MdDialogRef<ResetPasswordDialogComponent>) { }

  ngOnInit() {
  }

}
