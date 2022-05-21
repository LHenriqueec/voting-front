import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '../pages/home/model/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  startSession(sessionId: number) {
    return this.http.get(`/api/session/start/${sessionId}`)
  }

  detailSession(sessionId: number) {
    return this.http.get<Session>(`/api/session/${sessionId}`)
  }
}
