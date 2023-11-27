import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { InfomationComponent } from './components/sidebar/infomation/infomation.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuButtonComponent } from './components/ui/menu-button/menu-button.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuButtonComponent,
    SidebarComponent,
    InfomationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
