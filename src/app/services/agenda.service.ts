import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agenda } from '../pages/home/model/agenda';
import { Session } from '../pages/home/model/session';
import { User } from '../pages/home/model/user';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private http: HttpClient) { }

  listAgendas () {
    return this.http.get<Agenda[]>(`/api/agenda`)
  }

  registerAgenda (data: {agenda: Agenda, session: Session, users: User[]}) {
    return this.http.post('/api/agenda', data)
  }
}
