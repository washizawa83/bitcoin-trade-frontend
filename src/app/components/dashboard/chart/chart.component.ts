import { ChangeDetectorRef, Component } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexMarkers, ApexPlotOptions, ApexTitleSubtitle, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { ApiService } from 'src/app/services/api.service';
import { CandlestickChart, LineChart } from "echarts/charts";
import { TooltipComponent, GridComponent, LegendComponent, DataZoomComponent, MarkPointComponent } from "echarts/components";
import { EChartsOption } from 'echarts';
import { UniversalTransition } from 'echarts/features';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CandleViewModel, MaxMinViewModel, SmaViewModel } from 'src/app/models/finance.model';

export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	yaxis: ApexYAxis;
	title: ApexTitleSubtitle;
	plotOption?: ApexPlotOptions;
	markers?: ApexMarkers;
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
	readonly echartsExtentions!: any[];
	echartsOptions: EChartsOption = {};
	echartsInstance!: any
	zoomScope = 50
	startZoomValue$ = new BehaviorSubject(0)

	candles!: CandleViewModel
	maxmins!: MaxMinViewModel

	constructor(
		private _apiService: ApiService,
		private _cdr: ChangeDetectorRef,
	) {
		this.echartsExtentions = [
			CandlestickChart,
			TooltipComponent,
			GridComponent,
			LegendComponent,
			DataZoomComponent,
			MarkPointComponent,
			UniversalTransition,
			LineChart
		];
	}

	ngOnInit() {
		combineLatest([
			this._apiService.fetchCandles$(),
			this._apiService.fetchMaxmins$(),
			this._apiService.fetchSma$()
		]).subscribe(([candles, maxmins, smas]) => {
			const dataSize = candles.datetime.length
			this.setEchartOptions(
				candles.datetime,
				candles.ohcl,
				this.createMarkPoint(maxmins),
				this.createSmaLine(smas),
				dataSize)
		})
		this.loadDataPeriodically()
	}

	getCandles() {
		this._apiService.fetchCandles$().subscribe((candleViewModel) => {
			this.candles = candleViewModel
		})
	}

	getMaxMin() {
		this._apiService.fetchMaxmins$().subscribe((maxmins) => {
			this.maxmins = maxmins
		})
	}

	setEchartOptions(
		datetime: string[],
		ohcl: number[][],
		markPoinsts: any,
		smas: SmaViewModel,
		endZoomValue: number,
		startZoomValue?: number
	) {
		this.echartsOptions = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					animation: false,
					type: 'cross',
					lineStyle: {
					color: '#376df4',
					width: 2,
					opacity: 1
					}
				}
			},
			xAxis: {
				type: 'category',
				data: datetime,
				axisLine: { lineStyle: { color: '#8392A5' } }
			},
			yAxis: {
				scale: true,
				axisLine: { lineStyle: { color: '#8392A5' } },
				splitLine: { show: false }
			},
			grid: {
				bottom: 80
			},
			dataZoom: [{
					textStyle: {
						color: '#8392A5'
					},
					handleIcon:	'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
					dataBackground: {
						areaStyle: {
							color: '#8392A5'
						},
						lineStyle: {
							opacity: 0.8,
							color: '#8392A5'
						}
					},
					brushSelect: true,
					throttle: 20,
					startValue: startZoomValue ?? endZoomValue - this.zoomScope,
					// endValue: endZoomValue,
				},
				{
					type: 'inside'
				}
			],
			series: [
				{
					type: 'candlestick',
					name: 'Day',
					data: ohcl,
					itemStyle: {
						color: '#FD1050',
						color0: '#0CF49B',
						borderColor: '#FD1050',
						borderColor0: '#0CF49B'
					},
					markPoint: {
						label: {
							formatter: function (param: any) {
							return param != null ? Math.round(param.value) + '' : '';
							}
						},
						data: markPoinsts,
						tooltip: {
							formatter: function (param: any) {
							return param.name + '<br>' + (param.data.coord || '');
							}
						}
					}
				},
				{
					name: 'default SMA',
					type: 'line',
					data: smas,
					smooth: true,
					lineStyle: {
						opacity: 0.5
					}
				}
			],
		}
	}

	loadDataPeriodically() {
		setInterval(() => {
			const insideZoomModel = this.echartsInstance._componentsViews[4].dataZoomModel.option
			const startValue: number = insideZoomModel.startValue
			const endValue: number = insideZoomModel.endValue
			combineLatest([
				this._apiService.fetchCandles$(),
				this._apiService.fetchMaxmins$(),
				this._apiService.fetchSma$(),
			]).subscribe(([candles, maxmins, smas]) => {
				this.setEchartOptions(
					candles.datetime,
					candles.ohcl,
					this.createMarkPoint(maxmins),
					this.createSmaLine(smas),
					endValue,
					startValue)
				this._cdr.detectChanges();
			})
		}, 5000)
	}
	onChartChange(ec: any) {
		this.echartsInstance = ec
	}

	createMarkPoint(maxmins: MaxMinViewModel) {
		return maxmins.map((maxmin) => {
			return {
				name: 'MaxMin',
				coord: maxmin,
				value: maxmin[1],
				itemStyle: {
					color: '#626da2'
				}
			}
		})
	}

	createSmaLine(smas: SmaViewModel) {
		const smaDuration = 5
		const noData = '-'.repeat(smaDuration).split('')
		return [...noData, ...smas]
	}
}