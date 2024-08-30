import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      from_email: "",
      message: "",
    });
  }

  send() {
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
        },
        (err) => {
          console.error("FAILED...", err);
        }
      );
  }
}
