import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candle, OriginCandle } from '../models/finance.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  	constructor(
		private _http: HttpClient
	) { }

	getCandle$(): Observable<OriginCandle[]> {
		return this._http.get<OriginCandle[]>('http://127.0.0.1:8000/api/candles/')
	}
}
