import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
 
  constructor(private gs: HttpClient) { }
 
  getGameList(search?: string): Observable<APIResponse<Game>> {
    let params;

    if (search) {
      params = new HttpParams().set('search', search);
    }

    return this.gs.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }
  
  getGameDetails(id: string): Observable<Game> {
    return this.gs.get<Game>(`${env.BASE_URL}/games/${id}`);
  }
}

