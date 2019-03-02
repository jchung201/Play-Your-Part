import * as Auth0 from "auth0-web";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Opp } from "./opp.model";
import { OppsApiService } from "./opps-api.service";

@Component({
  selector: "opps",
  template: `
    <section id="main">
      <div class="inner">
        <header class="major special">
          <h1>About Play Your Part</h1>
          <p>Created by musicians for musicians</p>
        </header>
        <div class="table-wrapper">
          <table class="alt">
            <thead>
              <tr>
                <th>Category</th>
                <th>Title</th>
                <th>Description</th>
                <th>Location</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let opp of oppsList">
                <td>
                  {{
                    opp.category.charAt(0).toUpperCase() + opp.category.slice(1)
                  }}
                </td>
                <td>{{ opp.title }}</td>
                <td>{{ opp.description.substring(0, 40) }}</td>
                <td>{{ opp.location }}</td>
                <td>{{ opp.created_at | date: "MMM dd, yyyy" }}</td>
              </tr>
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
      </div>
    </section>
  `
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
