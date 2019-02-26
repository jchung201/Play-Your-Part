import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { OppsApiService } from "../listings/opps-api.service";
import { Router } from "@angular/router";

@Component({
  selector: "opp-form",
  template: `
    <div>
      <section id="main">
        <div class="inner">
          <header class="major special">
            <h1>New Listing</h1>
          </header>
          <section>
            <form>
              <div class="row uniform 50%">
                <div class="3u 12u$(xsmall)">
                  <input
                    type="radio"
                    id="priority-low"
                    name="priority"
                    checked=""
                    value="musician"
                    (change)="updateSearchType($event)"
                  />
                  <label for="priority-low">Need Musician</label>
                </div>
                <div class="9u 12u$(xsmall)">
                  <input
                    type="radio"
                    id="priority-normal"
                    name="priority"
                    value="group"
                    (change)="updateSearchType($event)"
                  />
                  <label for="priority-normal">Need Group</label>
                </div>
                <div class="4u 12u$(xsmall)">
                  <input
                    type="text"
                    name="title"
                    id="opp-title"
                    (keyup)="updateTitle($event)"
                    value=""
                    placeholder="Title"
                    required
                  />
                </div>
                <div class="4u 12u$(xsmall)">
                  <input
                    type="email"
                    name="location"
                    id="opp-location"
                    (keyup)="updateLocation($event)"
                    value=""
                    placeholder="Location"
                    required
                  />
                </div>
                <div class="4u 12u$(xsmall)">
                  <input
                    type="text"
                    name="contact"
                    id="opp-contact"
                    (keyup)="updateContact($event)"
                    value=""
                    placeholder="Contact"
                    required
                  />
                </div>
                <div class="12u$">
                  <div class="select-wrapper">
                    <select
                      name="category"
                      id="opp-category"
                      (change)="updateCategory($event)"
                      required
                    >
                      <option value="">- Category -</option>
                      <option value="violinist">Violinist</option>
                      <option value="cellist">Cellist</option>
                      <option value="bass">Bass</option>
                      <option value="weed">Weed</option>
                    </select>
                  </div>
                </div>
                <div class="12u$">
                  <textarea
                    name="description"
                    id="opp-description"
                    (keyup)="updateDescription($event)"
                    placeholder="Description"
                    rows="6"
                    required
                  ></textarea>
                </div>
                <div class="12u$">
                  <ul class="actions">
                    <li>
                      <input
                        type="submit"
                        value="Send Message"
                        class="special"
                        (click)="saveOpp($event)"
                      />
                    </li>
                    <li><input type="reset" value="Reset" /></li>
                  </ul>
                </div>
              </div>
            </form>
          </section>
        </div>
      </section>
    </div>
  `
})
export class OppFormComponent {
  opp = {
    searchType: "musician",
    category: "",
    title: "",
    description: "",
    author: "unknown",
    location: "",
    contact: ""
  };

  constructor(private oppsApi: OppsApiService, private router: Router) {}

  updateSearchType(event: any) {
    this.opp.searchType = event.target.value;
    console.log(this.opp.searchType);
  }
  updateCategory(event: any) {
    this.opp.category = event.target.value;
  }

  updateTitle(event: any) {
    this.opp.title = event.target.value;
  }

  updateDescription(event: any) {
    this.opp.description = event.target.value;
  }
  updateLocation(event: any) {
    this.opp.location = event.target.value;
  }
  updateContact(event: any) {
    this.opp.contact = event.target.value;
  }

  saveOpp(event: any) {
    event.preventDefault();
    if (
      this.opp.category === "" ||
      this.opp.title === "" ||
      this.opp.contact === ""
    ) {
      console.log("These fields are required");
    } else {
      this.oppsApi
        .saveOpp(this.opp)
        .subscribe(
          () => this.router.navigate(["/"]),
          error => alert(error.message)
        );
    }
  }
}
