import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CampaignService } from 'src/app/core/services/campaign.service';

@Component({
  selector: 'app-campaign-table',
  templateUrl: './campaign-table.component.html',
  styleUrls: ['./campaign-table.component.scss']
})
export class CampaignTableComponent implements OnInit {

  public input: string = '';
  public page = 1
  public perPage = 10
  // This value will be updated only after debounce
  public debouncedInputValue = this.input;

  public totalPages = []

  state = {}


  // Holds results
  public campaigns$: Subject<any> = new Subject();

  private searchDecouncer$: Subject<{ term: string, page: number, perPage: number, sort: {} }> = new Subject();

  constructor(private service: CampaignService) { }

  public ngOnInit(): void {
    // Setup debouncer
    this.setupSearchDebouncer();

    this.search({ term: this.input.toLocaleUpperCase(), page: this.page, perPage: this.perPage, sort: {} });
  }

  public onSearchInputChange(term: string): void {
    this.searchDecouncer$.next({ term: term.toLocaleUpperCase(), page: this.page, perPage: this.perPage, sort: {} });
  }

  public onPageChange(page): void {
    this.searchDecouncer$.next({ term: this.debouncedInputValue, page: page, perPage: this.perPage, sort: {} })
  }

  public onSort(columnName: string) {

    let order = (this.state[columnName] === 'desc')
      ? this.state[columnName] = "asc"
      : this.state[columnName] = "desc"

    this.searchDecouncer$.next({
      term: this.debouncedInputValue,
      page: this.page,
      perPage: this.perPage,
      sort: { column: columnName.toLowerCase(), order: order }
    })

  }

  private setupSearchDebouncer(): void {
    this.searchDecouncer$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((commities) => {
      this.debouncedInputValue = commities.term;
      this.search(commities);
    });
  }

  private search({ term, page, perPage, sort }): void {
    this.campaigns$.next(null);
    this.service.search(term, page, perPage).subscribe((results) => {
      this.totalPages = Array.from({ length: results['total_pages'] }, (v, k) => k + 1)
      if (sort.order === 'desc')
        results.data = this.reverseByKey(results.data, sort.column)
      else
        results.data = this.sortByKey(results.data, sort.column)

      this.campaigns$.next(results)
    })
  }

  private sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
  private reverseByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
  }

}
