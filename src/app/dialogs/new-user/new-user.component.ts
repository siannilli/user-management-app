import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { SameValueValidatorDirective } from '../../shared/SameValueAsValidator.directive';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'], 
})
export class NewUserComponent implements OnInit {

  constructor(private dialogRef:MdDialogRef<NewUserComponent>) { }

  ngOnInit() {
  }

  onSubmit(form:FormGroup){
    console.log(form);
  }

}

