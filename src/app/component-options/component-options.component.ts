import { CommonModule } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";
import { LanguageService } from "../language.service";

@Component({
  selector: "app-component-options",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./component-options.component.html",
  styles: ``,
})
export class ComponentOptionsComponent implements OnInit {
  toggleActive: boolean;

  constructor(private languageService: LanguageService) {
    this.toggleActive = true;
  }

  ngOnInit() {
    this.toggleActive = JSON.parse(localStorage.getItem("darkMode") || "true");
    this.updateDarkMode();
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener("document:click", ["$event"])
  closeDropdown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest(".dropdown")) {
      this.isDropdownOpen = false;
    }
  }

  switchLanguage(language: string) {
    this.languageService.switchLanguage(language);
  }

  handleToggleActive() {
    this.toggleActive = !this.toggleActive;
    this.updateDarkMode();
    localStorage.setItem("darkMode", JSON.stringify(this.toggleActive));
  }

  private updateDarkMode() {
    const htmlElement = document.documentElement;
    if (this.toggleActive) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }
}
