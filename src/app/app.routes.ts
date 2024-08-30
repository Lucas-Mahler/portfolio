import { Routes } from "@angular/router";
import { ComponentContactComponent } from "./component-contact/component-contact.component";
import { ComponentFormationComponent } from "./component-formation/component-formation.component";
import { ComponentMenuComponent } from "./component-menu/component-menu.component";
import { ComponentProjectsComponent } from "./component-projects/component-projects.component";
import { ComponentStackComponent } from "./component-stack/component-stack.component";
export const routes: Routes = [
  { path: "", component: ComponentMenuComponent },
  { path: "contact", component: ComponentContactComponent },
  { path: "formation", component: ComponentFormationComponent },
  { path: "project", component: ComponentProjectsComponent },
  { path: "stack", component: ComponentStackComponent },
  { path: "**", redirectTo: "" },
];
