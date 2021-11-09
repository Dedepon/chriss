import { Component, HostListener } from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { GLOBAL } from "./constants";
import { PersonService } from "./services/person/person.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  @HostListener("window:keydown", ["$event"])
  handleKeyDown(event: KeyboardEvent) {
    if (this.sk[this.pos] === event.key) {
      this.pos++;
      if (this.pos === this.sk.length) {
        GLOBAL.OUNI.next(true);
      }
    } else {
      this.pos = 0;
    }
  }

  public title = "chriss";

  private sk: string[] = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  private pos: number = 0;

  public constructor(private personService: PersonService, private router: Router) {
  }

  public isOutOfHomePage(): boolean {
    return !this.router.isActive("home", { paths: "exact", queryParams: "exact", fragment: "ignored", matrixParams: "ignored" });
  }

  public logout(): void {
    this.personService.logout().subscribe(() => this.router.navigate(["/home"]));
  }
}
