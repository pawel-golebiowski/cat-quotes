import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, delay, finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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
  quotesList: string[] = [];
  subscriptionGroup = new Subscription();
  catQuotes$!: Observable<CatQuoteData>;
  isLoading = false;

  readonly singleRequestQuotesAmount = 20;
  readonly throttle = 300;
  readonly scrollDistance = 1;

  constructor(
    private _catQuotesService: CatQuotesService,
    private _route: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.catQuotes$ = this._catQuotesService
      .getCatQuotes(this.singleRequestQuotesAmount)
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

  logout() {
    this._authService.setUserLoggedIn(false);
    this._route.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.subscriptionGroup.unsubscribe();
  }
}
