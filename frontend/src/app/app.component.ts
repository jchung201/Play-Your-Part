import { Component, OnInit } from "@angular/core";
import * as Auth0 from "auth0-web";

@Component({
  selector: "app-root",
  template: `
    <header id="header">
      <div class="inner">
        <a href="index.html" class="logo">Play Your Part</a>
        <nav id="nav">
          <a routerLink="/">Home</a>
          <a routerLink="/listings">Listings</a>
          <a routerLink="/new" *ngIf="authenticated">Create</a>
          <a routerLink="/about">About</a>
          <a
            class="button special"
            (click)="signIn()"
            *ngIf="!authenticated"
            style="padding-right: 2em"
          >
            Sign In
          </a>
          <a
            class="button special"
            (click)="signOut()"
            *ngIf="authenticated"
            style="padding-right: 2em"
          >
            Sign Out
          </a>
        </nav>
      </div>
    </header>
    <a href="#menu" class="navPanelToggle"><span class="fa fa-bars"></span></a>
    <router-outlet></router-outlet>
  `,
  styleUrls: ["../assets/css/main.css"]
})
export class AppComponent implements OnInit {
  authenticated = false;

  signIn = Auth0.signIn;
  signOut = Auth0.signOut;

  ngOnInit() {
    const self = this;
    Auth0.subscribe(authenticated => (self.authenticated = authenticated));
  }
}
