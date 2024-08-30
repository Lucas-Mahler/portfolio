import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from "@angular/router";
import { TranslocoModule } from "@ngneat/transloco";

@Component({
  selector: "app-component-navbar",
  standalone: true,
  imports: [TranslocoModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./component-navbar.component.html",
  styles: ``,
})
export class ComponentNavbarComponent {
  selectedSection = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe(() => {
      const url = this.router.url;
      this.selectedSection = url.split("/").pop() || "";
    });
  }

  selectSection(section: string) {
    this.selectedSection = section;
  }
}
