import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchResult } from './search-result.model';
import { YouTubeSearchService } from './you-tube-search.service';

import { fromEvent, of } from 'rxjs';
import { map, filter, debounceTime, tap, switchAll } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  template: `<input type="text" class="form-control" placeholder="Search" autofocus>`
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youtube: YouTubeSearchService,
              private el: ElementRef) {}

  ngOnInit(): void {
    fromEvent(this.el.nativeElement, 'keyup')
      .pipe (
        map((e: any) => e.target.value), // extract the value of the input
        filter((text: string) => text.length > 1), // filter out if empty
        debounceTime(250), // only search after 250 ms
        tap(() => this.loading.emit(true)), // Enable loading
        // search, call the search service
        map((query: string) => this.youtube.search(query)),
        // discard old events if new input comes in
        switchAll()
        // act on the return of the search
      ).subscribe(
        (results: SearchResult[]) => {
          // console.log('results.length :', results.length);
          this.loading.emit(false);
          this.results.emit(results);
        },
        (err: any) => {
          console.log(err);
          this.loading.emit(false);
        },
        () => {
          this.loading.emit(false);
        }
      );

    // Observable.fromEvent(this.el.nativeElement, 'keyup')
    //   .map((e: any) => e.target.value)
    //   .filter((text: string) => text.length > 1)
    //   .debounceTime(250)
    //   .do(() => this.loading.emit(true))
    //   .map((query: string) => this.youtube.search(query))
    //   .switch()
    //   .subscribe(
    //     (results: SearchResult[]) => {
    //       this.loading.emit(false);
    //       this.results.emit(results);
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.loading.emit(false);
    //     },
    //     () => {
    //       this.loading.emit(false);
    //     }
    //   );
  }
}
