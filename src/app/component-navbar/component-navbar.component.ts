import { CommonModule } from "@angular/common"; // Importation du module commun Angular
import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from "@angular/core"; // Importation des fonctionnalités de base d'Angular
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from "@angular/router"; // Importation des modules de routage d'Angular
import { TranslocoModule } from "@ngneat/transloco"; // Importation de la bibliothèque pour la traduction

// Classe qui gère l'effet de scrambling du texte
class TextScramble {
  el: HTMLElement; // Élément HTML où le texte sera affiché
  chars: string; // Caractères utilisés pour le scrambling
  frameRequest: number | undefined; // Identifiant de la requête d'animation
  queue: {
    from: string; // Texte d'origine
    to: string; // Nouveau texte
    start: number; // Cadre de début de l'animation
    end: number; // Cadre de fin de l'animation
    reverse: boolean; // Indique si l'animation doit être inversée
    char?: string; // Caractère aléatoire affiché
  }[] = []; // File d'attente pour gérer les animations de texte
  frame = 0; // Compteur de cadre
  resolve!: () => void; // Fonction de résolution de la promesse

  constructor(el: HTMLElement) {
    this.el = el; // Initialisation de l'élément HTML
    this.chars = "!<>-_\\/[]{}—=+^?#__"; // Définition des caractères pour le scrambling
    this.update = this.update.bind(this); // Liaison de la méthode update au contexte de la classe
  }

  // Méthode pour définir le texte à afficher
  setText(newText: string, reverse = false) {
    const oldText = this.el.innerText; // Texte actuel de l'élément
    const length = Math.max(oldText.length, newText.length); // Longueur maximale entre l'ancien et le nouveau texte
    const promise = new Promise<void>((resolve) => (this.resolve = resolve)); // Création d'une promesse pour gérer l'animation
    this.queue = []; // Réinitialisation de la file d'attente

    // Remplissage de la file d'attente avec les détails de chaque caractère
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ""; // Caractère d'origine
      const to = newText[i] || ""; // Nouveau caractère
      const start = Math.floor(Math.random() * 10); // Réduction du temps de départ
      const end = start + Math.floor(Math.random() * 10) + 5; // Réduction du temps de fin avec un minimum

      this.queue.push({ from, to, start, end, reverse }); // Ajout à la queue
    }

    // Annuler l'animation précédente si elle est en cours
    if (this.frameRequest !== undefined) {
      cancelAnimationFrame(this.frameRequest);
    }

    this.frame = 0; // Réinitialisation du compteur de cadre
    this.update(); // Démarrage de l'animation
    return promise; // Retourne la promesse
  }

  // Méthode pour mettre à jour le texte affiché
  update() {
    let output = ""; // Stocke le texte à afficher
    let complete = 0; // Compteur pour vérifier si tous les caractères sont complets

    // Boucle à travers la file d'attente
    for (let i = 0, n = this.queue.length; i < n; i++) {
      const { from, to, start, end, reverse, char } = this.queue[i];

      // Vérification si l'animation est terminée pour ce caractère
      if (this.frame >= end) {
        complete++;
        output += to; // Ajout du caractère final
      } else if (this.frame >= start) {
        // Si nous sommes dans la plage d'animation
        if (!char || Math.random() < 0.28) {
          this.queue[i].char = this.randomChar(); // Génération d'un caractère aléatoire
        }
        output += `<span class="dud">${this.queue[i].char}</span>`; // Affichage du caractère aléatoire
      } else {
        output += reverse ? to : from; // Affichage du texte d'origine ou du nouveau texte
      }
    }

    this.el.innerHTML = output; // Mise à jour de l'élément HTML

    // Vérification si tous les caractères sont complets
    if (complete === this.queue.length) {
      this.resolve(); // Résolution de la promesse
    } else {
      this.frameRequest = requestAnimationFrame(this.update); // Demande le prochain cadre d'animation
      this.frame++; // Incrémentation du compteur de cadre
    }
  }

  // Méthode pour générer un caractère aléatoire
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]; // Retourne un caractère aléatoire
  }
}

// Définition du composant Angular
@Component({
  selector: "app-component-navbar", // Sélecteur pour le composant
  standalone: true, // Indique que ce composant est autonome
  imports: [TranslocoModule, CommonModule, RouterLink, RouterLinkActive], // Importation des modules nécessaires
  templateUrl: "./component-navbar.component.html", // Chemin vers le fichier de template
  styles: ``, // Styles associés (peut être rempli)
})
export class ComponentNavbarComponent implements AfterViewInit {
  @ViewChildren("scrambleText") scrambleTexts!: QueryList<ElementRef>; // Utilisation de ViewChildren

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

  ngAfterViewInit() {
    const originalTexts: string[] = []; // Tableau pour stocker les textes originaux
    const textScramblers: TextScramble[] = []; // Tableau pour les instances de TextScramble

    this.scrambleTexts.forEach((el) => {
      const fx = new TextScramble(el.nativeElement); // Créer une instance pour chaque élément
      const originalText = el.nativeElement.innerText; // Récupérer le texte original
      originalTexts.push(originalText); // Stocker le texte original
      textScramblers.push(fx); // Ajouter à la liste des scramblers

      el.nativeElement.addEventListener("mouseenter", () => {
        fx.setText(originalText.split("").reverse().join(""));
      });

      el.nativeElement.addEventListener("mouseout", () => {
        fx.setText(originalText, true);
      });
    });
  }

  // Méthode pour sélectionner une section
  selectSection(section: string) {
    this.selectedSection = section; // Mise à jour de la section sélectionnée
  }
}
