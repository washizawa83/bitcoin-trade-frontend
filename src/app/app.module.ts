import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { InfomationComponent } from './components/sidebar/infomation/infomation.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuButtonComponent } from './components/ui/menu-button/menu-button.component';
import { ChartComponent } from './components/dashboard/chart/chart.component';
import { IgxFinancialChartModule } from 'igniteui-angular-charts';
import { TradingHistoryComponent } from './components/dashboard/trading-history/trading-history.component';
import { SignalComponent } from './components/dashboard/signal/signal.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NumberCardComponent } from './components/ui/number-card/number-card.component';
import { EchartsxModule } from 'echarts-for-angular';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuButtonComponent,
    SidebarComponent,
    InfomationComponent,
    ChartComponent,
    TradingHistoryComponent,
    SignalComponent,
    NumberCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    IgxFinancialChartModule,
    MatTableModule,
    HttpClientModule,
    NgApexchartsModule,
    EchartsxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
