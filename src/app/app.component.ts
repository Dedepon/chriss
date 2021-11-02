import { Component, HostListener } from '@angular/core';
import { GLOBAL } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostListener('window:keydown', ['$event'])
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

  public title = 'chriss';
  private sk: string[] = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  private pos: number = 0;
}
