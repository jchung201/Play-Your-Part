import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "opps",
  template: `
    <section id="main">
      <div class="inner">
        <header class="major special">
          <h1>About Play Your Part</h1>
          <p>Created by musicians for musicians</p>
        </header>
        <a href="#" class="image fit"
          ><img
            src="https://static1.squarespace.com/static/57a9dcfd46c3c496d8299f87/t/59cc261fcab339fb541ce26b/1506564920959/Queen-770.jpg"
            alt=""
        /></a>
        <p>
          Vis accumsan feugiat adipiscing nisl amet adipiscing accumsan blandit
          accumsan sapien blandit ac amet faucibus aliquet placerat commodo.
          Interdum ante aliquet commodo accumsan vis phasellus adipiscing.
          Ornare a in lacinia. Vestibulum accumsan ac metus massa tempor.
          Accumsan in lacinia ornare massa amet. Ac interdum ac non praesent.
          Cubilia lacinia interdum massa faucibus blandit nullam. Accumsan
          phasellus nunc integer. Accumsan euismod nunc adipiscing lacinia erat
          ut sit. Arcu amet. Id massa aliquet arcu accumsan lorem amet accumsan.
        </p>
        <p>
          Amet nibh adipiscing adipiscing. Commodo ante vis placerat interdum
          massa massa primis. Tempus condimentum tempus non ac varius cubilia
          adipiscing placerat lorem turpis at. Aliquet lorem porttitor interdum.
          Amet lacus. Aliquam lobortis faucibus blandit ac phasellus. In amet
          magna non interdum volutpat porttitor metus a ante ac neque. Nisi
          turpis. Commodo col. Interdum adipiscing mollis ut aliquam id ante
          adipiscing commodo integer arcu amet Ac interdum ac non praesent.
          Cubilia lacinia interdum massa faucibus blandit nullam. Accumsan
          phasellus nunc integer. Accumsan euismod nunc adipiscing lacinia erat
          ut sit. Arcu amet. Id massa aliquet arcu accumsan lorem amet accumsan
          commodo odio cubilia ac eu interdum placerat placerat arcu commodo
          lobortis adipiscing semper ornare pellentesque.
        </p>
        <p>
          Amet nibh adipiscing adipiscing. Commodo ante vis placerat interdum
          massa massa primis. Tempus condimentum tempus non ac varius cubilia
          adipiscing placerat lorem turpis at. Aliquet lorem porttitor interdum.
          Amet lacus. Aliquam lobortis faucibus blandit ac phasellus. In amet
          magna non interdum volutpat porttitor metus a ante ac neque. Nisi
          turpis. Commodo col. Interdum adipiscing mollis ut aliquam id ante
          adipiscing commodo integer arcu amet blandit adipiscing arcu ante.
        </p>
      </div>
    </section>
  `
})
export class AboutComponent {
  constructor(private router: Router) {}
}
