import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const QUOTES_URL = 'https://meowfacts.herokuapp.com/';

export interface CatQuoteData {
  data: string[];
}

@Injectable({
  providedIn: 'root',
})
export class CatQuotesService {
  constructor(private _http: HttpClient) {}

  getCatQuotes(quoteAmount?: number): Observable<CatQuoteData> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('count', quoteAmount ?? 1);
    
    return this._http.get<CatQuoteData>(QUOTES_URL, { params: queryParams });
  }
}
