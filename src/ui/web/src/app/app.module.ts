import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { AngularFontAwesomeModule } from "angular-font-awesome";

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgbModule,
    DashboardModule,
    CoreModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [
    {
      provide: "API_URL",
      useValue: "https://b40eee89.ngrok.io/api/"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
