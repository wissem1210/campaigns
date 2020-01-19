import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SidebarModule } from 'ng-sidebar';
import { CampaignTableComponent } from './campaign-table/campaign-table.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [LayoutComponent, CampaignTableComponent],
  imports: [
    AngularFontAwesomeModule,
    SidebarModule.forRoot(),
    CommonModule,
    BrowserModule,
    FormsModule,

  ]
})
export class DashboardModule { }
