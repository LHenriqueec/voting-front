import { _resolveDirectionality } from '@angular/cdk/bidi/directionality';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Agenda } from 'src/app/pages/home/model/agenda';
import { Session } from 'src/app/pages/home/model/session';
import { User } from 'src/app/pages/home/model/user';
import { SessionService } from 'src/app/services/session.service';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {
  agenda: Agenda;
  displayedColumnsUsers = ['id', 'name', 'cpf', 'options']
  dataSourceUsers = new MatTableDataSource<User>();
  countdown = {}
  timeOver = false

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private voteService: VoteService
  ) {
    this.agenda = <Agenda> this.router.getCurrentNavigation()?.extras
  }

  ngOnInit(): void {
    if(this.agenda?.session?.id) {
      this.sessionService
        .detailSession(this.agenda.session.id)
        .subscribe(response => {
          if(response.startedAt) this._detailSession(response)
          else this._startSession(response)
        })
    }
  }

  _detailSession(session: Session) {
    this.dataSourceUsers.data = session.users
    session.startedAt = new Date(session.startedAt)
    session.endedAt = new Date(session.endedAt)
    this.startTimer(new Date(), session.endedAt)
  }

  _startSession(session: Session) {
    if(session.id) {
      this.sessionService
        .startSession(session.id)
        .subscribe(_ => this.countdown = {leftTime: (session.duration || 1) * 60, format: 'mm:ss'})
    }
  }

  startTimer(startedAt: Date, endedAt: Date) {
    const seconds:number = (endedAt.getTime() - startedAt.getTime()) / 1000
    this.countdown = {leftTime: seconds, format: 'mm:ss'}
  }

  disableVoting(user: User) {
    return user.vote != undefined || this.timeOver
  }

  countVoting(value: string|undefined) {
    return this.dataSourceUsers.data.filter((user: User) => user.vote == value).length
  }

  setTimeOver(event: {action: String, left: number}) {
    this.timeOver = event.action === 'done' || event.left <= 0
  }

  registerVote(user: User, value: String) {
    this.voteService.registerVote({
      sessionId: this.agenda.session.id,
      userId: user.id,
      value
    }).subscribe(_ => user.vote = value)
  }
}

