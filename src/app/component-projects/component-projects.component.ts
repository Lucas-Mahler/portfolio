import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { TranslocoModule } from "@ngneat/transloco";

@Component({
  selector: "app-component-projects",
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: "./component-projects.component.html",
  styles: [],
})
export class ComponentProjectsComponent implements OnInit {
  isComponentVisible = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.isComponentVisible = true;
    }, 100);
  }

  toggleDropdown(id: string): void {
    const menuIds = ["edf", "mywebsite", "mashup"];

    menuIds.forEach((menuId) => {
      const element = document.getElementById(menuId);
      if (element) {
        if (menuId === id) {
          element.classList.toggle("hidden");
        } else {
          element.classList.add("hidden");
        }
      }
    });
  }
}
