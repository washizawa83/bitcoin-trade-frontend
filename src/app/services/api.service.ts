import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CandleViewModel, OriginCandle } from '../models/finance.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  	constructor(
		private _http: HttpClient
	) { }

	getCandles$(): Observable<CandleViewModel[]> {
		return this._http.get<OriginCandle[]>('http://127.0.0.1:8000/api/candles/')
		.pipe(
			map((candles) => {
				return candles.map((candle) => {
					const { id, ...rest } = candle;
					return {
						x: new Date(rest.datetime),
						y: [rest.open, rest.high, rest.low, rest.close]
					}
				})
			})
		)
	}
}
