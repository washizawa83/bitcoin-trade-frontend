import { Component, EventEmitter, Input, Output } from '@angular/core';
import { navItemTypes } from 'src/app/models/sidebar.model';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent {
    @Input() text!: navItemTypes
    @Input() selected = false
}
