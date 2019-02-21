import {
  MatToolbarModule,
  MatButtonModule,
  MatCardModule
} from "@angular/material";
import * as Auth0 from "auth0-web";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { OppsApiService } from "./opps/opps-api.service";

import { OppFormComponent } from "./opps/opp-form.component";
import { AboutComponent } from "./info/about.component";
import { RouterModule, Routes } from "@angular/router";
import { OppsComponent } from "./opps/opps.component";
import { CallbackComponent } from "./callback.component";

const appRoutes: Routes = [
  { path: "callback", component: CallbackComponent },
  { path: "about", component: AboutComponent },
  { path: "new-opp", component: OppFormComponent },
  { path: "", component: OppsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    OppFormComponent,
    OppsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatButtonModule,
    MatCardModule
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
