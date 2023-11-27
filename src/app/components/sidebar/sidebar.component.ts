import { Component } from '@angular/core';
import { navItemTypes, navItems } from 'src/app/models/sidebar.model';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
	constructor(
		private sidebarService: SidebarService
	) {}
	sidebarNavItems = Object.values(navItems)
	currentNavItem = ''
	
	ngOnInit(): void {
		this.sidebarService.getCurrentNavItem$().subscribe((currentNavItem) => {
			this.currentNavItem = currentNavItem
		})
	}

	setCurrentNavItem(value: navItemTypes):void {
		this.sidebarService.setCurrentNavItem(value)
	}


}
