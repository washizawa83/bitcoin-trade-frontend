import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { navItemTypes, navItems } from 'src/app/models/sidebar.model';


@Injectable({
  providedIn: 'root'
})
export class SidebarService {

    constructor() { }
	currentNavItem$ = new BehaviorSubject<navItemTypes>(navItems['trade'])

	getCurrentNavItem$(): Observable<navItemTypes> {
		return this.currentNavItem$.pipe()
	}

	setCurrentNavItem(value: navItemTypes): void {
		this.currentNavItem$.next(value)
	}
}
