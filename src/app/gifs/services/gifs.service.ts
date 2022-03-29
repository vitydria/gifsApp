import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'qOgPrx46EcPYeP9mOpC8wL698T2KK91Q';
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public results: Gif[] = [];

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  get historial(): string[] {
    return [...this._historial];
  }

  searchGifs(query: string) {
    if (!this._historial.includes(query) && query.trim().length)
      this._historial.unshift(query);

    this._historial = this._historial.splice(0, 10);
    localStorage.setItem('history', JSON.stringify(this._historial));

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.serviceURL}/search`, { params })
      .subscribe((resp: any) => {
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }
}
