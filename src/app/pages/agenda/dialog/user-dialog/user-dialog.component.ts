import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  formUser: FormGroup;


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>
  ) {
    this.formUser = this.fb.group({
      name: [undefined, Validators.required],
      cpf: [undefined, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  close() {
    return this.dialogRef.close(this.formUser.value)
  }
}

