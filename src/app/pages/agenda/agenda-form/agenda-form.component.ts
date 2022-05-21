import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { AgendaService } from 'src/app/services/agenda.service';


import { User } from '../../home/model/user';
import { UserDialogComponent } from '../dialog/user-dialog/user-dialog.component'

@Component({
  selector: 'app-agenda-form',
  templateUrl: './agenda-form.component.html',
  styleUrls: ['./agenda-form.component.scss']
})
export class AgendaFormComponent implements OnInit {
  displayedColumnsUsers = ['id', 'name', 'cpf']
  dataSourceUsers = new MatTableDataSource<User>([]);
  formAgenda: FormGroup;
  formSession: FormGroup;
  durations = [1, 5, 10, 30, 60]

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private agendaService: AgendaService
  ) {
    this.formAgenda = this.fb.group({
      subject: ['', Validators.required],
    })

    this.formSession = this.fb.group({
      duration: [1]
    })
  }

  ngOnInit(): void {
  }

  openDialogUser() {
    const dialogUserRef = this.dialog.open(UserDialogComponent)
    dialogUserRef.afterClosed().subscribe(user => {
      this.dataSourceUsers.data = this.dataSourceUsers.data.concat([user])
    })
  }

  registerAgenda() {
    this.agendaService.registerAgenda({
        agenda: this.formAgenda.value,
        session: this.formSession.value,
        users: this.dataSourceUsers.data
    }).subscribe(() => this.router.navigate(['home']))
  }

  validateForms() {
    return this.formAgenda.invalid
    || this.formSession.invalid
    || this.dataSourceUsers.data.length == 0
  }
}
