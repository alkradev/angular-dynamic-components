import { Component, Input } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";

import { AdComponent } from "./ad.component";

@Component({
  template: `
    <div class="hero-profile" [@flyInOutHorizontal]="show">
      <h3>Featured Hero Profile</h3>
      <h4>{{ data.name }}</h4>

      <p>{{ data.bio }}</p>

      <strong>Hire this hero today!</strong>
    </div>
  `,
  animations: [
    trigger("flyInOutHorizontal", [
      transition("* => true", [
        style({ opacity: 0 }),
        animate("1s ease-in-out", style({ opacity: 1 }))
      ]),
      transition("* => false", [
        animate("1s ease-in-out", style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HeroProfileComponent implements AdComponent {
  @Input() data: any;
  @Input() show: any;
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
