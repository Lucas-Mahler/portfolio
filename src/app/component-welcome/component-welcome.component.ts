import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-component-welcome",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./component-welcome.component.html",
  styles: ``,
})
export class ComponentWelcomeComponent implements OnInit {
  isVisible = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isVisible = false;
    }, 2000);
  }
}
