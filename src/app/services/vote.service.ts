import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  registerVote(vote: {
    sessionId?: number,
    userId?: Number,
    value: String
  }) {
    return this.http.post('/api/vote', vote)
  }
}
