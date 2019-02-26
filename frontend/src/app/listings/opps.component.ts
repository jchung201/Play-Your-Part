import * as Auth0 from "auth0-web";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Opp } from "./opp.model";
import { OppsApiService } from "./opps-api.service";

@Component({
  selector: "opps",
  template: `
    <h2>Opps</h2>
    <p>Choose an opp to start volunteering</p>
    <div>
      <mat-list>
        <mat-list-item *ngFor="let opp of oppsList" style="border-style:solid;">
          <img
            matListAvatar
            src="https://asparkofhope.org/wp-content/uploads/2016/01/Donation_d32b5760-67d2-485e-9a78-ed2b3d97b23d_grande.png"
            alt="generic"
          />
          <h3 matLine>{{ opp.title }}</h3>
          <p matLine>
            <span> {{ opp.organization }} </span>
            <span class="demo-2"> -- {{ opp.description }} </span>
          </p>
        </mat-list-item>
      </mat-list>
    </div>
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
    if (roles) {
      return roles.includes("admin");
    }
    return false;
  }
}
