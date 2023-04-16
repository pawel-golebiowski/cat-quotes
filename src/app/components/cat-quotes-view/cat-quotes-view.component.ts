import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, delay, finalize } from 'rxjs';
import {
  CatQuoteData,
  CatQuotesService,
} from 'src/app/services/cat-quotes.service';

@Component({
  selector: 'app-cat-quotes-view',
  templateUrl: './cat-quotes-view.component.html',
  styleUrls: ['./cat-quotes-view.component.scss'],
})
export class CatQuotesViewComponent implements OnInit, OnDestroy {
  constructor(private _catQuotesService: CatQuotesService) {}

  quotesList: string[] = [];
  subscriptionGroup = new Subscription();
  readonly sigleRequestQuotesAmount = 20;
  readonly throttle = 300;
  readonly scrollDistance = 1;

  isLoading = false;

  catQuotes$!: Observable<CatQuoteData>;

  ngOnInit(): void {
    this.catQuotes$ = this._catQuotesService
      .getCatQuotes(this.sigleRequestQuotesAmount)
      .pipe(delay(2000));

    this.downloadQuotes();
  }

  downloadQuotes() {
    this.isLoading = true;
    this.subscriptionGroup.add(
      this.catQuotes$.pipe(finalize(() => (this.isLoading = false))).subscribe({
        next: (value) => this._addQuoteIfUnique(value.data),
      })
    );
  }

  private _addQuoteIfUnique(newQuotes: string[]) {
    newQuotes.forEach((quote) => {
      if (this.quotesList.some((element) => element === quote) === false)
        this.quotesList.push(quote);
    });
  }

  onScrollLoadData() {
    this.downloadQuotes();
  }

  ngOnDestroy(): void {
    this.subscriptionGroup.unsubscribe();
  }
}
