import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { TranslocoModule } from "@ngneat/transloco";

@Component({
  selector: "app-component-stack",
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: "./component-stack.component.html",
  styles: [
    `
      @keyframes typing {
        from {
          width: 0;
        }
        to {
          width: 100%;
        }
      }

      @keyframes blink {
        50% {
          border-color: transparent;
        }
      }

      .typing {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        border-right: 2px solid; /* Curseur de texte */
        animation:
          typing 1.3s steps(40, end) 1s 1 normal both,
          blink 1.5s step-end infinite;
      }

      @keyframes expandFromLeft {
        from {
          transform: scaleX(0);
          opacity: 0;
        }
        to {
          transform: scaleX(1);
          opacity: 1;
        }
      }

      .expand-in {
        transform-origin: left; /* Point d'origine pour l'animation */
        transform: scaleX(0); /* État initial */
        opacity: 0; /* Masquer initialement */
        animation: expandFromLeft 0.6s ease-out forwards;
      }

      .reveal-in {
        position: relative; /* Nécessaire pour clip-path */
        clip-path: inset(0 100% 0 0); /* Masquer content droite */
        opacity: 1;
        visibility: visible;
        animation: revealFromLeft 0.5s ease-out forwards;
      }

      .hidden {
        opacity: 0;
        visibility: hidden;
      }

      @keyframes revealFromLeft {
        0% {
          clip-path: inset(0 100% 0 0);
          opacity: 0;
        }
        100% {
          clip-path: inset(0 0 0 0);
          opacity: 1;
        }
      }
    `,
  ],
})
export class ComponentStackComponent implements OnInit {
  activeSection1 = false;
  activeSection2 = false;
  activeSection3 = false;
  activeSection4 = false;
  isInviteVisible = false;
  isDivVisible = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.showInvite();
    }, 500);
  }

  showInvite(): void {
    this.isInviteVisible = true;
    setTimeout(() => {
      this.isDivVisible = true;
    }, 2800);
  }

  hideInvite(): void {
    this.isInviteVisible = false;
    this.isDivVisible = false;
  }

  toggleAccordion(section: number): void {
    switch (section) {
      case 1:
        this.activeSection1 = !this.activeSection1;
        break;
      case 2:
        this.activeSection2 = !this.activeSection2;
        break;
      case 3:
        this.activeSection3 = !this.activeSection3;
        break;
      case 4:
        this.activeSection4 = !this.activeSection4;
        break;
      default:
        break;
    }
  }

  isActive(section: number): boolean {
    if (section === 1) {
      return this.activeSection1;
    }
    if (section === 2) {
      return this.activeSection2;
    }
    if (section === 3) {
      return this.activeSection3;
    }
    if (section === 4) {
      return this.activeSection4;
    }
    return false;
  }
}
