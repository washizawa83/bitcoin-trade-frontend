import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CandleViewModel, MaxMinViewModel, ResponseCandle, ResponseMaxMin, ResponseSma, SmaViewModel } from '../models/finance.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
	baseUrl = 'http://127.0.0.1:8000/api/'

  	constructor(
		private _http: HttpClient
	) { }

	private get$<T>(url: string): Observable<T> {
		return this._http.get<T>(url)
	}

	fetchCandles$(): Observable<CandleViewModel> {
		return this.get$<ResponseCandle[]>('http://127.0.0.1:8000/api/candles/')
		.pipe(
			map((candles) => {
				return {datetime: this.filterCandleDatetime(candles), ohcl: this.filterOHCL(candles)}
			})
		)
	}

	fetchMaxmins$(): Observable<MaxMinViewModel> {
		return this.get$<ResponseMaxMin[]>('http://127.0.0.1:8000/api/maxmins/')
		.pipe(
			map((maxmins) => {
				return this.convertMaxMinViewModel(maxmins)
			})
		)
	}

	fetchSma$(): Observable<SmaViewModel> {
		return this.get$<ResponseSma[]>(`${this.baseUrl}smas/`)
		.pipe(
			map((smas) => {
				return smas.map((sma) => sma.price)
			})
		)
	}

	private filterCandleDatetime(candles: ResponseCandle[]): string[] {
		return candles.map((candle) => {
			const { id, ...rest } = candle;
			return rest.datetime
		})
	}

	private filterOHCL(candles: ResponseCandle[]): number[][] {
		return candles.map((candle) => {
			const { id, ...rest } = candle;
			return [rest.close, rest.open, rest.low, rest.high]
		})
	}

	private convertMaxMinViewModel(maxmins: ResponseMaxMin[]): MaxMinViewModel {
		return maxmins.map((maxmin) => [maxmin.candle.datetime, maxmin.price])
	}
}
