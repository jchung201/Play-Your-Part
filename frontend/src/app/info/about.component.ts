import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "opps",
  template: `
    <div>
      <h2>About</h2>
    </div>
  `
})
export class AboutComponent {
  constructor(private router: Router) {}
}
