import { Component } from "@angular/core";
import { TranslocoModule } from "@ngneat/transloco";

@Component({
  selector: "app-component-formation",
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: "./component-formation.component.html",
  styles: `
    .bullet::before {
      content: "•";
      color: currentColor;
      margin-right: 0.5rem;
    }
    @media (max-width: 640px) {
      .no-bullet-sm::before {
        content: none;
      }
    }
  `,
})
export class ComponentFormationComponent {}
