import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) {}

  hist = this.gifsService.historial;

  search(args: any): void {
    console.log(args);
    this.gifsService.searchGifs(args);
  }

  get historial(): string[] {
    return this.gifsService.historial;
  }
}
