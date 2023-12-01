import { Component, ElementRef, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { Candle, CandleDrawList } from 'src/app/models/finance.model';
import { ApiService } from 'src/app/services/api.service';
declare var google: any;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
	@ViewChild('candleStickChart') candleStickChart!: ElementRef
	candles: CandleDrawList[] = []

	constructor(
		private _apiService: ApiService
	) {}

	ngOnInit() {
		this._apiService.getCandle$()
		.pipe(
			map((candles) => {
				return candles.map((candle) => {
					const { id, ...rest } = candle;
					return [rest.datetime, rest.high, rest.open, rest.low, rest.close]
				})
			})
		)
		.subscribe((candles) => {
			this.candles = candles
		})
	}

	// [datetime, high, open, low, close]
	testData = [
		['Mon', 50, 40, 30, 20],
	]

	drawChart = (testData: (string | number)[][]) => {
		const data = google.visualization.arrayToDataTable(testData, true);
	  
		const options = {
			backgroundColor: '#303030',
			candlestick: {
				fallingColor: {fill: '#FF6666', stroke: '#FF6666'},
				risingColor: {fill: '#33FF66', stroke: '#33FF66'}
			},
			colors:['white'],
			hAxis: {
				textStyle: {
					color: '#CCC'
				}
			},
			vAxis: {
				textStyle: {
					color: '#CCC'
				}
			},
			chartArea: {
				width: '78%',
				height: '80%',
				left: 250,
				top: 50,
			},
		};
	  
		const chart = new google.visualization.CandlestickChart(this.candleStickChart.nativeElement);
	  
		chart.draw(data, options);
	}

	ngAfterViewInit() {
		google.charts.load('current', { 'packages': ['corechart'] });
		google.charts.setOnLoadCallback(() => this.drawChart(this.candles));
	}
}
