import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "opps",
  template: `
    <!-- Banner -->
    <section id="banner">
      <div class="inner">
        <h1>
          Connect with other Musicians
        </h1>
        <ul class="actions">
          <li>
            <a routerLink="/listings" class="button alt">I need a group</a>
          </li>
          <li>
            <a routerLink="/listings" class="button alt">I need musicians</a>
          </li>
        </ul>
      </div>
    </section>

    <!-- One -->
    <section id="one">
      <div class="inner">
        <header>
          <h2>Play Your Part</h2>
        </header>
        <p>
          Community connecting musicians looking for a team or teams looking for
          musicians to fill roles.
        </p>
        <ul class="actions">
          <li><a routerLink="/about" class="button alt">Learn More</a></li>
        </ul>
      </div>
    </section>

    <!-- Two -->
    <section id="two">
      <div class="inner">
        <article>
          <div class="content">
            <header>
              <h3>Musicians looking for a Group</h3>
            </header>
            <div class="image fit">
              <img src="../../assets/images/pic01.jpg" alt="" />
            </div>
            <p>
              You can find a group or post your own listing.
            </p>
          </div>
          <a routerLink="/about" class="button alt">Find a group</a>
        </article>
        <article class="alt">
          <div class="content">
            <header>
              <h3>Groups looking for musicians</h3>
            </header>
            <div class="image fit">
              <img src="../../assets/images/pic02.jpg" alt="" />
            </div>
            <p>
              Search for musicians or post a listing.
            </p>
            <a routerLink="/about" class="button alt">Find a musician</a>
          </div>
        </article>
      </div>
    </section>
  `
})
export class HomeComponent {
  constructor(private router: Router) {}
}
