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
            <a routerLink="/listings" class="button alt"
              >I am looking for a group</a
            >
          </li>
          <li>
            <a routerLink="/listings" class="button alt"
              >I am looking for a musician</a
            >
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
              <img
                src="https://lh3.googleusercontent.com/HlHcwg_CSkXx27YNeHIS-GAV5MHI0K8iyln4c96R6QPx5BCIwHeo7wX6tBDZSS_8Hvj7knqblC_H9sOMceGK4H_1r3RKo-LExvPS3sZmAy-6V3NdGJdHjKJ-4-zbWvdAo_crw-vFjB_1l7_2NBZf4GTNfDC4I_bCSyAEJ-yn9Tfq9vd8qNUCG-txRan36SBr1gtdQbZ6LKH-qaYXs63RN_4_MftgBVh_tn7btlPQ7jpuJ-aGUd1EQO5__XZfGTZiFDGAa5CLtZUE9FtspLXvv8oh9tgkJ5JQmVL_WTKEGgYACkPrfi1_G-kHx7cDiU1EhuOl1TRqGYay1ILa3RFf5iQxetgBZfJ6XYx1CeWxJrSCL_Kwx_noUtVZPYNozy2g-pp1-Qxalf1VsjH4TV9cn5y49B5fITErBeYu0QOqicgMkq4OcmDuZtG39StUMmRy9pVnbl0q3YiWcBg0O6XSCPF30XbUQCwQZfALwt0mAl2UzDGb5rdlVXlGT6Fn84JH3XRPwwVEOVAUGZtXUcShZVFkS5ZoaVC2Sq8PmMFNTKxOe7I6Q0ZMqNiJphX_TJhqD05XAI_jPa1RLCYnVtCB43YDdIlEnLJWa6z32sQ3Uvbc6dEkrraSDhx-xjxNgtGdWOo0btdeid18wDW0COfMxqDeRV47_A=w420-h250-no"
                alt=""
              />
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
              <img
                src="https://lh3.googleusercontent.com/gpLHnCY8bLQBUe9xO39_Ph1aJ8ZIOMBtnZky8uoJfjZjDsxvJXz30BRA1Is9cj1G-DDGrF0C5A3fZkR9GPh9mIZvwTjX8_A1V1FZOtyiUbaskkK0oZOv1VpCW3Nzcy_FnJvI0ThNu88IoChRM_Tgtuan-THaIO0eYXgDRFQZ-iE2KRPLmhaKpPJ4CisPUfUnmOq52M4yU8UUKRhNlaxHa_-iP-M7FaNbnjCwGklep4u2vI9O4uAQshP2h6utJCY2DxWB7eD71Yx89oV0cKf9JsD755LUyz4PhtiXasH-e2cb-P3oc0xNDskXF5lxI1a5MajjPAjc0djTsKSJ4_LMqkY9v4LnVxkAKNqGAxIYixYeJHCE4vkthEyoySJnoMP6xupNFiKo_1NYwOCsXQLhuw55VifAITokMDSddQcVyKA5PDYu6lqybwT3Cu3Vlp0McGJ1sj_C0rNKV2iyKeddmYZqbKB4BXlRVivjIDQHwoCdj2d3At3YeZ81s_SwV8HjyMB4_dIttQdLuuOBsw4kqqWw2k67OEvwbXHP8c4jvZQGWiNVxVJR50p0R4m7r8zOH5UNptC04PfQpT7i4ecIbxAitW-NUlIly1ozPMzV8klALKIcAH9pkfkxP1Id5B3ZMO4Qk1wcQmwDYH4SDk0gCwd5mlxJDQ=w420-h250-no"
                alt=""
              />
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
