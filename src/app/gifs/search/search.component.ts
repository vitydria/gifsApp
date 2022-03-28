import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  constructor(private gifsService: GifsService) {}

  @ViewChild('inputSearch') inputSearch!: ElementRef<HTMLInputElement>;

  search(): void {
    const value = this.inputSearch.nativeElement.value;
    if (!this.gifsService.historial.includes(value) && value.trim().length)
      this.gifsService.searchGifs(value);
    this.inputSearch.nativeElement.value = '';
  }
}
