import * as Auth0 from "auth0-web";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Opp } from "./opp.model";
import { OppsApiService } from "./opps-api.service";

@Component({
  selector: "opps",
  template: `
    <h2>Opps</h2>
    <p>Choose an opp and start studying.</p>
    <div class="opps">
      <mat-card
        class="example-card"
        *ngFor="let opp of oppsList"
        class="mat-elevation-z5"
      >
        <mat-card-content>
          <mat-card-title>{{ opp.title }}</mat-card-title>
          <mat-card-subtitle
            >{{ opp.description }}{{ opp.organization }}{{ opp.location
            }}{{ opp.contact }}</mat-card-subtitle
          >
          <p>
            Etiam enim purus, vehicula nec dapibus quis, egestas eu quam. Nullam
            eleifend auctor leo, vitae rhoncus mi sodales vel. Aenean fermentum
            laoreet volutpat. Integer quam orci, molestie non nibh suscipit,
            faucibus euismod sapien.
          </p>
          <button mat-raised-button color="accent">Start Opp</button>
          <button
            mat-button
            color="warn"
            *ngIf="isAdmin()"
            (click)="delete(opp.id)"
          >
            Delete
          </button>
        </mat-card-content>
      </mat-card>
    </div>
    <button
      mat-fab
      color="primary"
      *ngIf="authenticated"
      class="new-opp"
      routerLink="/new-opp"
    >
      <i class="material-icons">note_add</i>
    </button>
  `,
  styleUrls: ["opps.component.css"]
})
export class OppsComponent implements OnInit, OnDestroy {
  oppsListSubs: Subscription;
  oppsList: Opp[];
  authenticated = false;

  constructor(private oppsApi: OppsApiService) {}

  ngOnInit() {
    this.oppsListSubs = this.oppsApi.getOpps().subscribe(res => {
      this.oppsList = res;
    }, console.error);
    const self = this;
    Auth0.subscribe(authenticated => (self.authenticated = authenticated));
  }

  ngOnDestroy() {
    this.oppsListSubs.unsubscribe();
  }

  delete(oppId: number) {
    this.oppsApi.deleteOpp(oppId).subscribe(() => {
      this.oppsListSubs = this.oppsApi.getOpps().subscribe(res => {
        this.oppsList = res;
      }, console.error);
    }, console.error);
  }

  isAdmin() {
    if (!Auth0.isAuthenticated()) return false;

    const roles = Auth0.getProfile()["https://online-opps.com/roles"];
    return roles.includes("admin");
  }
}
