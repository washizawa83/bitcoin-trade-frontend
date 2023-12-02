import { Component } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexPlotOptions, ApexXAxis } from 'ng-apexcharts';

export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.scss']
})
export class SignalComponent {
	displayedColumns = ['datetime', 'signal', 'position'];
  	dataSource = ELEMENT_DATA;
}

export interface PeriodicElement {
	datetime: string;
	signal: string
	position: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
	{datetime: '2023-12-01', signal: 'ゴールデンクロス発生', position: '売'},
	{datetime: '2023-12-01', signal: 'ゴールデンクロス発生', position: '買'},
	{datetime: '2023-12-01', signal: 'ゴールデンクロス発生', position: '売'},
	{datetime: '2023-12-01', signal: 'ゴールデンクロス発生', position: '買'},
	{datetime: '2023-12-01', signal: 'ゴールデンクロス発生', position: '買'},
	{datetime: '2023-12-01', signal: 'ゴールデンクロス発生', position: '売'},
	{datetime: '2023-12-01', signal: 'ゴールデンクロス発生', position: '買'},
	{datetime: '2023-12-01', signal: 'ゴールデンクロス発生', position: '売'},
	{datetime: '2023-12-01', signal: 'ゴールデンクロス発生', position: '買'},
	{datetime: '2023-12-01', signal: 'ゴールデンクロス発生', position: '売'},
];