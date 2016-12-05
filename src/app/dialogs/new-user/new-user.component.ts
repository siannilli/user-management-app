import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  result = {
    username: undefined,
    password: undefined,
    password_confirm: undefined,
    email: undefined
  };

  constructor(private dialogRef:MdDialogRef<NewUserComponent>) { }

  ngOnInit() {
  }

}
