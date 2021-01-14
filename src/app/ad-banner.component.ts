import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  OnDestroy
} from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";

import { AdDirective } from "./ad.directive";
import { AdItem } from "./ad-item";
import { AdComponent } from "./ad.component";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-ad-banner",
  template: `
    <div class="ad-banner-example">
      <h3>Advertisements</h3>
      <ng-template adHost></ng-template>
    </div>
  `
})
export class AdBannerComponent implements OnInit, OnDestroy {
  @Input() ads: AdItem[];
  currentAdIndex = -1;
  @ViewChild(AdDirective, { static: true }) adHost: AdDirective;
  private destroyed = new Subject();
  componentRefs = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    console.log("AdBannerComponent initialization...");
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    this.destroyed.next();
  }

  loadComponent() {
    console.log("Component references length: " + this.componentRefs.length);
    if (this.componentRefs.length > 0) {
      this.componentRefs.forEach(cr => {
        (<AdComponent>cr.instance).show = false;
      });
      setTimeout(() => {
        this.cycleComponents();
      }, 1000);
    } else {
      this.cycleComponents();
    }
  }

  cycleComponents() {
    const viewContainerRef = this.adHost.viewContainerRef;
    const subsetAds = this.ads.slice(0, this.ads.length - 1);

    viewContainerRef.clear();

    console.log("Ad subset length: " + subsetAds.length);
    this.componentRefs = [];
    subsetAds.forEach(ad => {
      console.log(ad);
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        ad.component
      );
      let componentRef = viewContainerRef.createComponent(componentFactory);
      this.componentRefs.push(componentRef);
      (<AdComponent>componentRef.instance).data = ad.data;
      (<AdComponent>componentRef.instance).show = true;
    });
  }

  getAds() {
    interval(10000)
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        this.loadComponent();
        console.log("AdBanner interval ping");
      });
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
