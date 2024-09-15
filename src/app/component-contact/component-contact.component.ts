import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import emailjs from "@emailjs/browser";
import { TranslocoModule } from "@ngneat/transloco";

@Component({
  selector: "app-component-contact",
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, TranslocoModule],
  templateUrl: "./component-contact.component.html",
  styles: [],
})
export class ComponentContactComponent implements OnInit {
  isInviteVisible = false;
  form: FormGroup;
  showToast = false;

  // Variables pour gérer le drag
  isDragging = false;
  position = { x: 0, y: 0 }; // Position initiale
  offset = { x: 0, y: 0 }; // Décalage lors du drag

  @ViewChild("inviteDiv") inviteDiv!: ElementRef; // Référence au div

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      from_email: ["", [Validators.required, Validators.email]],
      message: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showInvite();
    }, 100);
  }

  showInvite(): void {
    this.isInviteVisible = true;
  }

  hideInvite(): void {
    this.isInviteVisible = false;
  }

  send() {
    if (this.form.valid) {
      const formValues = this.form.value;

      emailjs
        .send(
          "service_v9ltgfq",
          "template_a19bqrr",
          {
            from_email: formValues.from_email,
            message: formValues.message,
          },
          "pd8JKsp-Vh77EpMra"
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);

            this.form.reset();

            this.showToast = true;
            setTimeout(() => {
              this.showToast = false;
            }, 3000);
          },
          (err) => {
            console.error("FAILED...", err);
          }
        );
    } else {
      console.error("Form is invalid");
    }
  }

  // Fonction pour initier le drag
  startDragging(event: MouseEvent): void {
    this.isDragging = true;
    this.offset = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y,
    };
  }

  // Fonction pour déplacer le composant pendant le drag
  onDrag(event: MouseEvent): void {
    if (this.isDragging) {
      this.position = {
        x: event.clientX - this.offset.x,
        y: event.clientY - this.offset.y,
      };
    }
  }

  // Fonction pour stopper le drag
  stopDragging(): void {
    this.isDragging = false;
  }

  // Optionnel : Si l'utilisateur sort du composant pendant qu'il le déplace, le drag se termine
  @HostListener("document:mouseup", ["$event"])
  onMouseUp(): void {
    this.isDragging = false;
  }
}
