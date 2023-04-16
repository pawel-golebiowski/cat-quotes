import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cat-quote',
  templateUrl: './cat-quote.component.html',
  styleUrls: ['./cat-quote.component.scss'],
})
export class CatQuoteComponent {
  @Input() quote!: string;
}
