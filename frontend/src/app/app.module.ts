import {
  MatToolbarModule,
  MatButtonModule,
  MatListModule
} from "@angular/material";
import * as Auth0 from "auth0-web";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { OppsApiService } from "./listings/opps-api.service";
import { OppFormComponent } from "./listings/opp-form.component";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";
import { RouterModule, Routes } from "@angular/router";
import { OppsComponent } from "./listings/opps.component";
import { CallbackComponent } from "./callback.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "listings", component: OppsComponent },
  { path: "about", component: AboutComponent },
  { path: "new", component: OppFormComponent },
  { path: "callback", component: CallbackComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    OppFormComponent,
    OppsComponent,
    AboutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatButtonModule,
    MatListModule
  ],
  providers: [OppsApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    Auth0.configure({
      domain: "pyp-today.auth0.com",
      audience: "https://pyp.today",
      clientID: "lagPB1JmXjfGR4obMZBWPSmzDjanfn2X",
      redirectUri: "http://localhost:4200/callback",
      scope: "openid profile manage:orgs"
    });
  }
}
