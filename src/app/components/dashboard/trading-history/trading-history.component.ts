import { Component } from '@angular/core';

@Component({
  selector: 'app-trading-history',
  templateUrl: './trading-history.component.html',
  styleUrls: ['./trading-history.component.scss']
})
export class TradingHistoryComponent {
	displayedColumns = ['datetime', 'position', 'lot', 'price', 'status'];
  	dataSource = ELEMENT_DATA;
}

export interface PeriodicElement {
	datetime: string;
	position: string;
	lot: number;
	price: string;
	status: number
}

const ELEMENT_DATA: PeriodicElement[] = [
	{datetime: '2023-12-01', position: '売', lot: 1.0079, price: '100000', status: 2},
	{datetime: '2023-12-01', position: '買', lot: 4.0026, price: '100000', status: 1},
	{datetime: '2023-12-01', position: '売', lot: 6.941, price: '100000', status: 1},
	{datetime: '2023-12-01', position: '買', lot: 9.0122, price: '100000', status: 1},
	{datetime: '2023-12-01', position: '買', lot: 10.811, price: '100000', status: 1},
	{datetime: '2023-12-01', position: '売', lot: 12.0107, price: '100000', status: 1},
	{datetime: '2023-12-01', position: '買', lot: 14.0067, price: '100000', status: 1},
	{datetime: '2023-12-01', position: '売', lot: 15.9994, price: '100000', status: 1},
	{datetime: '2023-12-01', position: '買', lot: 18.9984, price: '100000', status: 1},
	{datetime: '2023-12-01', position: '売', lot: 20.1797, price: '100000', status: 1},
];