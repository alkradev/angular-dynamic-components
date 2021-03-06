import { Component, Input } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";

import { AdComponent } from "./ad.component";

@Component({
  template: `
    <div class="job-ad" [@flyInOutHorizontal]="show">
      <h4>{{ data.headline }}</h4>

      {{ data.body }}
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
export class HeroJobAdComponent implements AdComponent {
  @Input() data: any;
  @Input() show: any;
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
