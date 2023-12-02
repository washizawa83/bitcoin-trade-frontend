import { ChangeDetectorRef, Component } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexPlotOptions, ApexTitleSubtitle, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { CandleViewModel } from 'src/app/models/finance.model';
import { ApiService } from 'src/app/services/api.service';

export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	yaxis: ApexYAxis;
	title: ApexTitleSubtitle;
	plotOption?: ApexPlotOptions;
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  	chartOptions!: ChartOptions;

	constructor(
		private _apiService: ApiService,
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.getCandles(true)
		this.loadDataPeriodically()
	}

	getCandles(isAnimation: boolean) {
		 this._apiService.getCandles$().subscribe((candles) => {
			this.drawChart(candles, isAnimation)
		 })
	}

	drawChart(candles: CandleViewModel[], isAnimation: boolean = false) {
		this.chartOptions = {
			series: [
				{
					name: "candle",
					data: candles
				}
			],
			chart: {
				type: "candlestick",
				height: 350,
				animations: {enabled: isAnimation},
			},
			title: {
				text: "JPY / BTC",
				align: "left"
			},
			xaxis: {
			  	type: "datetime",
				labels: {
					style: {
						colors: "#AAA"
					},
					rotate: -30,
					rotateAlways: true,
					hideOverlappingLabels: true,
					minHeight: 40
				}
			},
			yaxis: {
				tooltip: {
					enabled: true
				},
				labels: {
					style: {
						colors: ["#AAA"]
					}
				}
			},
		}
	}

	loadDataPeriodically() {
		setInterval(() => {
			this.getCandles(false)
			this.cdr.detectChanges()
		}, 5000)
	}
}