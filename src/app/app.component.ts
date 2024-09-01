import { CommonModule } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ComponentNavbarComponent } from "./component-navbar/component-navbar.component";
import { ComponentOptionsComponent } from "./component-options/component-options.component";
import { ComponentWelcomeComponent } from "./component-welcome/component-welcome.component";

class TrailParticle {
  x: number;
  y: number;
  size: number;
  time: number;
  ttl: number;
  alpha: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1; // Taille
    this.time = 0;
    this.ttl = Math.floor(Math.random() * 30) + 30; // Temps de vie
    this.alpha = 1; // Opacité init
  }

  update(alphamain: number) {
    this.time++;
    this.alpha = alphamain - (alphamain * this.time) / this.ttl; // Diminue l'opacité avec le temps
  }

  draw(ctx: CanvasRenderingContext2D) {
    //ctx.filter = "blur(1px)"; trop de stress gpu
    ctx.fillStyle = `rgba(156,163,175, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  isDead() {
    return this.time >= this.ttl;
  }
}

class Particle {
  randomIndexX: number;
  randomIndexY: number;
  x: number;
  y: number;
  size: number;
  time: number;
  ttl: number;
  speedX: number;
  speedY: number;
  trails: TrailParticle[] = [];
  values = [-5, -4, -3, 3, 4, 5];
  alpha: number;
  turn: number;

  constructor(x: number, y: number) {
    this.turn = 0;
    this.randomIndexX = Math.floor(Math.random() * this.values.length);
    this.randomIndexY = Math.floor(Math.random() * this.values.length);
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1; // Taille
    this.time = 0;
    this.ttl = Math.floor(Math.random() * 20) + 50; // Temps de vie
    this.speedX = this.values[this.randomIndexX]; // Vitesse aléatoire en X
    this.speedY = this.values[this.randomIndexY]; // Vitesse aléatoire en Y
    this.alpha = 1; // Opacité init
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Ajouter une nouvelle TrailParticle à la position actuelle
    this.trails.push(new TrailParticle(this.x, this.y));

    if (Math.random() > 0.97) {
      this.turn++;
      this.randomIndexX = Math.floor(Math.random() * this.values.length);
      this.randomIndexY = Math.floor(Math.random() * this.values.length);
      this.speedX = this.values[this.randomIndexX]; // Vitesse aléatoire en X
      this.speedY = this.values[this.randomIndexY]; // Vitesse aléatoire en Y
    }

    // Réinitialiser la particule si elle sort du canvas
    if (
      this.x < 0 ||
      this.x > window.innerWidth ||
      this.y < 0 ||
      this.y > window.innerHeight
    ) {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      this.time = 0; // Réinitialiser le temps
    }

    this.time++;
    this.alpha = 1 - (1 * this.time) / this.ttl; // Diminue l'opacité avec le temps

    this.trails = this.trails.filter((trail) => {
      trail.update(this.alpha);
      return !trail.isDead();
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Dessiner les TrailParticles
    this.trails.forEach((trail) => trail.draw(ctx));

    // Dessiner la particule principale
    ctx.fillStyle = `rgba(156,163,175, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  isDead() {
    return this.size <= 0;
  }
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    ComponentWelcomeComponent,
    ComponentNavbarComponent,
    ComponentOptionsComponent,
    RouterOutlet,
  ],

  templateUrl: "app.component.html",
  providers: [],
})
export class AppComponent implements OnInit {
  @ViewChild("canvas", { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private canvasWidth!: number;
  private canvasHeight!: number;
  showWelcomePage = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.showWelcomePage = false;
    }, 2500); // Mettre 2500 apres
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext("2d")!;
    this.updateCanvasDimensions();

    window.addEventListener("resize", () => this.updateCanvasDimensions()); // Mettre à jour la taille du canvas lors du redimensionnement de la fenêtre

    this.generateParticles(10); // Générer particules au démarrage
    this.animationLoop();
  }

  private updateCanvasDimensions(): void {
    const canvas = this.canvasRef.nativeElement;
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
  }

  private generateParticles(count: number): void {
    for (let i = 0; i < count; i++) {
      const x = Math.random() * this.canvasWidth;
      const y = Math.random() * this.canvasHeight;
      this.particles.push(new Particle(x, y));
    }
  }

  private lastTimestamp = 0;
  private fpsInterval = 1000 / 60;

  private animationLoop(timestamp?: number): void {
    if (!timestamp) timestamp = 0; // Initialisation de timestamp

    // Calculer le temps écoulé depuis la dernière frame
    const elapsed = timestamp - this.lastTimestamp;

    if (elapsed > this.fpsInterval) {
      this.lastTimestamp = timestamp - (elapsed % this.fpsInterval);

      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      // Filtrer et mettre à jour les particules
      this.particles = this.particles.filter((particle) => {
        particle.update();
        particle.draw(this.ctx);
        if (particle.isDead()) {
          // Supprime la particule morte et en génère une nouvelle
          const x = Math.random() * this.canvasWidth;
          const y = Math.random() * this.canvasHeight;
          this.particles.push(new Particle(x, y));
          return false;
        }
        return true;
      });
    }

    if (document.visibilityState === "visible") {
      requestAnimationFrame((ts) => this.animationLoop(ts));
    }
  }

  selectedSection = "menu";
  selectSection(section: string) {
    this.selectedSection = section;
  }
}
