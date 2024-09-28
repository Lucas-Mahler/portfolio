import { CommonModule } from "@angular/common"; // Importation du module commun Angular
import { Component, ElementRef, QueryList, ViewChildren } from "@angular/core"; // Importation des fonctionnalités de base d'Angular
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from "@angular/router"; // Importation des modules de routage d'Angular
import { TranslocoModule } from "@ngneat/transloco"; // Importation de la bibliothèque pour la traduction

// class TextScramble {
//   el: HTMLElement;
//   chars: string;
//   frameRequest: ReturnType<typeof setTimeout> | undefined; // Type corrigé pour accepter Timeout
//   speed = 500; // Vitesse de l'effet en ms
//   maxScrambleSteps = 4; // Chaque lettre subit 3 changements avant de se stabiliser
//   isAnimating = false; // Verrou pour éviter les animations en conflit

//   constructor(el: HTMLElement) {
//     this.el = el;
//     this.chars = "!<>-_\\/[]{}—=+^?#__"; // Liste de caractères pour le scramble
//   }

//   setText(newText: string, reverse = false) {
//     if (this.isAnimating) return;

//     this.isAnimating = true;

//     const oldText = this.el.innerText;

//     // Si une animation précédente est en cours, on l'annule
//     if (this.frameRequest !== undefined) {
//       clearTimeout(this.frameRequest); // Utilisation de clearTimeout pour annuler l'animation en cours
//     }

//     // Lancement de l'animation de scramble
//     this.runScramble(oldText, newText, reverse, 0, 0).then(() => {
//       this.isAnimating = false; // Déverrouiller une fois l'animation terminée
//     });
//   }

//   private runScramble(
//     oldText: string,
//     newText: string,
//     reverse: boolean,
//     step: number,
//     index: number
//   ): Promise<void> {
//     return new Promise((resolve) => {
//       let output = "";

//       const actualIndex = reverse ? oldText.length - 1 - index : index;

//       for (let i = 0; i < oldText.length; i++) {
//         if ((reverse && i > actualIndex) || (!reverse && i < actualIndex)) {
//           output += newText[i] || oldText[i];
//         } else if (i === actualIndex && step < this.maxScrambleSteps) {
//           output += this.randomChar();
//         } else {
//           output += oldText[i];
//         }
//       }

//       this.el.innerHTML = output;

//       if (step < this.maxScrambleSteps) {
//         this.frameRequest = setTimeout(() => {
//           this.runScramble(oldText, newText, reverse, step + 1, index).then(
//             resolve
//           );
//         }, this.speed);
//       } else if (index < oldText.length) {
//         this.frameRequest = setTimeout(() => {
//           this.runScramble(oldText, newText, reverse, 0, index + 1).then(
//             resolve
//           );
//         }, this.speed);
//       } else {
//         this.el.innerHTML = newText;
//         resolve();
//       }
//     });
//   }

//   randomChar() {
//     return this.chars[Math.floor(Math.random() * this.chars.length)];
//   }
// }

// Définition du composant Angular
@Component({
  selector: "app-component-navbar", // Sélecteur pour le composant
  standalone: true, // Indique que ce composant est autonome
  imports: [TranslocoModule, CommonModule, RouterLink, RouterLinkActive], // Importation des modules nécessaires
  templateUrl: "./component-navbar.component.html", // Chemin vers le fichier de template
  styles: ``, // Styles associés (peut être rempli)
})
export class ComponentNavbarComponent {
  @ViewChildren("scrambleText") scrambleTexts!: QueryList<ElementRef>;

  selectedSection = ""; // Variable pour stocker la section sélectionnée

  constructor(
    private route: ActivatedRoute, // Injecte le routeur actif
    private router: Router // Injecte le routeur
  ) {
    // Écoute les événements de changement de route
    this.router.events.subscribe(() => {
      const url = this.router.url; // Récupération de l'URL actuelle
      this.selectedSection = url.split("/").pop() || ""; // Extraction de la dernière partie de l'URL
    });
  }

  // ngAfterViewInit() {
  //   const textScramblers: TextScramble[] = [];

  //   this.scrambleTexts.forEach((el) => {
  //     const fx = new TextScramble(el.nativeElement);
  //     const originalText = el.nativeElement.innerText;

  //     textScramblers.push(fx);

  //     // Effet onMouseEnter : brouillage progressif
  //     el.nativeElement.addEventListener("mouseenter", () => {
  //       fx.setText(originalText);
  //     });

  //     // Effet onMouseOut : restauration progressive inverse
  //     el.nativeElement.addEventListener("mouseout", () => {
  //       fx.setText(originalText, true); // Inverser l'effet
  //     });
  //   });
  // }
  // Méthode pour sélectionner une section
  selectSection(section: string) {
    this.selectedSection = section; // Mise à jour de la section sélectionnée
  }
}
