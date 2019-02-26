import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { OppsApiService } from "./opps-api.service";
import { Router } from "@angular/router";

@Component({
  selector: "opp-form",
  template: `
    <div>
      <h2>New Opp</h2>
      <label for="opp-title">Title</label>
      <input id="opp-title" (keyup)="updateTitle($event)" />
      <label for="opp-description">Description</label>
      <input id="opp-description" (keyup)="updateDescription($event)" />
      <label for="opp-organization">Organization</label>
      <input id="opp-organization" (keyup)="updateOrganization($event)" />
      <label for="opp-location">Location</label>
      <input id="opp-location" (keyup)="updateLocation($event)" />
      <label for="opp-contact">Contact</label>
      <input id="opp-contact" (keyup)="updateContact($event)" />
      <button (click)="saveOpp()">Save Opp</button>
    </div>
  `
})
export class OppFormComponent {
  opp = {
    title: "",
    description: "",
    organization: "",
    location: "",
    contact: ""
  };

  constructor(private oppsApi: OppsApiService, private router: Router) {}

  updateTitle(event: any) {
    this.opp.title = event.target.value;
  }

  updateDescription(event: any) {
    this.opp.description = event.target.value;
  }
  updateOrganization(event: any) {
    this.opp.organization = event.target.value;
  }
  updateLocation(event: any) {
    this.opp.location = event.target.value;
  }
  updateContact(event: any) {
    this.opp.contact = event.target.value;
  }

  saveOpp() {
    this.oppsApi
      .saveOpp(this.opp)
      .subscribe(
        () => this.router.navigate(["/"]),
        error => alert(error.message)
      );
  }
}
