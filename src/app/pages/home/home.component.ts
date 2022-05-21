import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from 'src/app/services/agenda.service';
import { Agenda } from './model/agenda';
import { Session } from './model/session';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['subject', 'users', 'status', 'options'];
  dataSource: Agenda[] = []
  constructor(
    private service: AgendaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service
      .listAgendas()
      .subscribe(data => {
        this.dataSource = data
      })
  }

  startSession(agenda: {}) {

    this.router.navigate(['voting'], agenda)
  }

}
